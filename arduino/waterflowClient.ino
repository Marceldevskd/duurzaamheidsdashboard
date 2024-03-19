#include "WiFiS3.h"
#include "WiFiSSLClient.h"
#include "IPAddress.h"
#include "arduino_secrets.h"

// VARS

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;
int wifiStatus = WL_IDLE_STATUS; // WiFi verbinding status [WL_IDLE_STATUS = 0] & [WL_CONNECTED = 3]
int hallPin = 2;						// De pin waarop pulsen worden ontvangen door de hallsensor
float measuredWater = 0;			// Gemeten totaal water [10% foutmarge]
float postData;						// Data die we willen versturen
unsigned long lastUsed;				// Als lastUsed groter is dan 10 minuten wordt de WiFi verbinding verbroken
const int DELAY_TIME = 600000;	// Wachttijd voor verbreken WiFi [Origineel idee was ook om de 10 minuten een NTP server te pollen maar onze backender is eindelijk akkoord gegaan dat de server zelf timestamps regelt]
IPAddress server(123, 45, 678, 90);
WiFiSSLClient client;

// SETUP
void setup()
{
	wifiConnect();
	attachInterrupt(digitalPinToInterrupt(2), waterPulse, HIGH);
	client.setCACert("hierkomtnogeencertificaatzodrawehethebben"); // Wij maken gebruik van (self-signed) certificaten omdat we te lui zijn een echte te regelen.
}

// RUN

void loop()
{

	if (measuredWater > 0)
	{ // Check of er een nieuwe meting heeft plaatsgevonden;

		if (wifiStatus == 0)
		{ // Hier wordt eindelijk van wifiStatus gebruik gemaakt om een extra WiFi.status() functie te vermeiden.
			wifiConnect();
		}

		delay(1000);	 // Delays kunnen worden geinterrupt dus wacht 1 seconde voordat je de data gaat kopiëren.
		noInterrupts(); // Zorg ervoor dat measuredWater tijdelijk niet kan worden veranderd door interrupts om data corruptie te voorkomen
		postData = measuredWater;
		measuredWater = 0;
		interrupts();

		sendData();
		lastUsed = millis(); // Zet de laatst gebruikte tijd na het versturen van de data.
	}

	wifiShutdown(); // Check of het apparaat al een tijd niet is gebruikt.
}

// FUNCTIONS

void wifiConnect()
{
	while (wifiStatus != WL_CONNECTED)
	{
		wifiStatus = WiFi.begin(ssid, pass); // WiFi.begin() returnt wel een waarde
		delay(9000);
	}
} // De delay zorgt hier wel helaas ervoor dat als iemand de kraan gebruikt wanneer de WiFi uitstaat er een delay op zit van 10 seconden [samen met de normale 1 second delay] voor de frontend maakt dit niet uit.

void wifiShutdown()
{ // Checkt of de tijd voorbij is en WiFi aan staat.
	if (millis() - lastUsed >= DELAY_TIME && wifiStatus == 3)
	{
		WiFi.end();						  // WiFi.end() returnt geen waarde
		wifiStatus = WL_IDLE_STATUS; // LET OP: WiFi.end() zet de volledige WiFi module uit, de standaard waarde van WiFi.status() hier zou ook 0 (WL_IDLE_STATUS) returnen.
	}
} // LET OP: millis() zal na ongeveer 50 dagen overflowen, dat betekent dat WiFi wordt uitgezet ookal kan het zijn dat de kraan binnen 10 minuten is gebruikt.

void waterPulse()
{
	measuredWater += 1.81;
}

void sendData()
{
	if (client.connect(server, 443))
	{ // Start de verbinding met de server
		client.println("POST / HTTP/1.1");
		client.println("HOST: HOST-IP");
		client.println("Content-Type: application/json");
		client.println("Connection: close");
		client.println();
		client.print("{\"sensorName\": \"Water-1\", \"ml\": ");
		client.print(postData);
		client.println("}");
	}
	client.stop(); // Stopt de verbinding met de server [checkt niet of er nog ongelezen status berichten zijn van de server]
}
