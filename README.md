
# Proyecto Integrador Modulo Full Stack - ISPC-2024
# Nombre del equipo: TecnoXpress
### Probelma + Solucion 
Node packages may not be installed. Try installing with 'npm install'.
Error: Could not find the '@angular-devkit/build-angular:dev-server' builder's node package.
PS D:\main this one\TecnoXpress-ISPC-24\Front-End24\TecnoXpress> npm install 
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! 
npm ERR! While resolving: ng2-charts@6.0.1
npm ERR! Found: @angular/core@17.3.11
npm ERR! node_modules/@angular/core
npm ERR!   @angular/core@"^17.3.0" from the root project
npm ERR!   peer @angular/core@"17.3.11" from @angular/animations@17.3.11
npm ERR!   node_modules/@angular/animations
npm ERR!     @angular/animations@"^17.3.11" from the root project
npm ERR!     peerOptional @angular/animations@"17.3.11" from @angular/platform-browser@17.3.11
npm ERR!     node_modules/@angular/platform-browser
npm ERR!       @angular/platform-browser@"^17.3.0" from the root project
npm ERR!       5 more (@angular/forms, @angular/platform-browser-dynamic, ...)
npm ERR!   8 more (@angular/common, @angular/compiler, @angular/forms, ...)
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer @angular/cdk@">=17.0.0" from ng2-charts@6.0.1
npm ERR! node_modules/ng2-charts
npm ERR!   ng2-charts@"^6.0.1" from the root project
npm ERR! 
npm ERR! Conflicting peer dependency: @angular/core@18.0.3
npm ERR! node_modules/@angular/core
npm ERR!   peer @angular/core@"^18.0.0 || ^19.0.0" from @angular/cdk@18.0.3
npm ERR!   node_modules/@angular/cdk
npm ERR!     peer @angular/cdk@">=17.0.0" from ng2-charts@6.0.1
npm ERR!     node_modules/ng2-charts
npm ERR!       ng2-charts@"^6.0.1" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! C:\Users\flash\AppData\Local\npm-cache\_logs\2024-06-15T18_52_31_617Z-eresolve-report.txt

### Solucion 
Paso1: 
npm install --legacy-peer-deps
Paso2: (Opcional):
ng update @angular/core @angular/cli


### Integrantes:
* Andrea Paola Testa 
* Franco Daniel Vega
* Valentina Tachini
* Erica Vanina Robledo 
* Sergio Gabriel Valdiviezo
* Carolina Valles
* Romina Soledad Robledo
* Romina Tejeda
* Saidi Taoufik

### En rama MAIN:
Carpeta Repositorio 2023 
### En rama Develope:
Carpeta Repositorio 2023 
Carpeta Documentación 2024

### En WIKI:
Se han dejado plasmado el link del **Repositorio de origen** y  las **Ceremonias de Scrum y Documentaciones**

Ingreso a la rama de caro para trabajar juntos en los services de auth