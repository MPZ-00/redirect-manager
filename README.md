# Redirect Manager

Dies ist eine einfache Benutzerprofil-Anwendung, die mit reinem JavaScript, CSS, Node.js, Express erstellt und mit Docker containerisiert wurde. 

Die Anwendung ermöglicht es Ihnen, Benutzerprofile zu erstellen, zu bearbeiten und zu löschen und zwischen verschiedenen Farbthemen zu wechseln. Die Profile werden in einer MongoDB-Datenbank gespeichert, und die Anwendung wird von einem Node.js-Backend mit dem Express-Framework bedient.

## Erste Schritte

### Voraussetzungen

- Docker: Die Anwendung läuft in Docker-Containern, daher müssen Sie Docker auf Ihrem Computer installiert haben.

### Installation

1. Klonen Sie das Repository:

    ```
    git clone https://github.com/MPZ-00/redirect-manager.git
    ```

2. Navigieren Sie in das Projektverzeichnis:

    ```
    cd redirect-manager/app
    ```

3. Starten Sie die Anwendung:

    ```
    node server.js
    ```

#### Über Docker-Hub

1. Pull
   ```
   docker pull mpz00/redirect-manager:latest
   ```
   
2. Starten
   ```
    docker run -d --name redirect-manager -p 3000:3000 -v /docker/redirectData.json:/usr/src/app/data.json redirect-manager
    ```

Die Anwendung sollte nun unter `http://localhost:3000` laufen. Sie können auch auf die Mongo-Express-Web-Oberfläche unter `http://localhost:8081` zugreifen.

## Nutzung

Um die Anwendung zu nutzen, navigieren Sie in Ihrem Webbrowser zu `http://localhost:3000`.

Sie können auch zwischen verschiedenen Farbthemen umschalten, indem Sie auf die Schaltfläche 'Toggle Theme' oben auf der Seite klicken.

## Mitwirken

Wenn Sie an diesem Projekt mitwirken möchten, zögern Sie nicht, einen Pull Request einzureichen. 

## Lizenz

Dieses Projekt ist unter der ISC-Lizenz lizenziert. Weitere Details finden Sie in der Datei `LICENSE`.

## Kontakt

Martin Prätzlich - [Github](https://github.com/MPZ-00)

Projekt-Link: https://github.com/MPZ-00/redirect-manager