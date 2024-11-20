let btn = document.getElementById("btnOffOn")

function sendCommand() {
    const client = new Paho.MQTT.Client("mqtt.broker.url", Number(8083), "clientId");
    
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
        useSSL: true,
        userName: "username",
        password: "password",
        onFailure: function () {
            console.log("Не удалось подключиться к брокеру.");
        }
    });

    function onConnect() {
        console.log("Подключено!");
        
        // Отправка сообщения
        const message = new Paho.MQTT.Message("ON");
        message.destinationName = "/home/livingroom/light";
        client.send(message);

        console.log("Команда отправлена: ON");
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("Потеряно соединение:" + responseObject.errorMessage);
        }
    }

    function onMessageArrived(message) {
        console.log("Полученное сообщение: " + message.payloadString);
    }
}

// Обработчик события нажатия кнопки
document.getElementById('light-switch').addEventListener('click', sendCommand);