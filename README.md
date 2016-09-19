# plattform-platt.de source code

## development

### backend

`cd restapp`

`docker-compose build`

`docker-compose run django py.test -s ./src`

`docker-compose run django python ./src/manage.py migrate `

`docker-compose run -p 8000:8000 django python ./src/manage.py runserver 0.0.0.0:8000`

### frontend

`cd client`

`npm install`

`npm start`


Open your browser at [`http://localhost:8080/`](http://localhost:8080/).
