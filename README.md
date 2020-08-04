# Video Conferencing React / [Demo](https://video-conferencing-react.web.app/)

This project uses [create-react-app](https://create-react-app.dev/) as a base for the frontend.

This project uses [OpenVidu](https://openvidu.io/index) on the backend to handle the connection with peers; streaming directioning and storage of calls.

To connect this project with the server, you have to modify the `.env.development` file in the `conferencing-react` folder. For testing, you only modify the values to the ones you're going to use in your test environment. For production, create a `.env` or a `.env.production` file with the same variable names contained in `.env.development` and with the values that you're going to use in your production server.

To run in a development environment, run the command `npm start` inside `conferencing-react` folder.

To create a production build, run the `npm run build` command inside the `conferencing-react` folder.

---
To run a backend server test environment, run the following command

```bash
docker run -p 4443:4443 --rm \
    -e OPENVIDU_SECRET=MY_SECRET \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=*/PATH/TO/VIDEO/FILES* \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v */PATH/TO/VIDEO/FILES*:*/PATH/TO/VIDEO/FILES* \
openvidu/openvidu-server-kms:2.15.0
```

If using Docker Toolbox on Windows, use the following command

```bash
docker run -p 4443:4443 --rm \
    -e OPENVIDU_SECRET=MY_SECRET \
    -e DOMAIN_OR_PUBLIC_IP=*DOCKER-MACHINE IP, USUALLY 192.168.99.100* \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/opt/openvidu/recordings \
    -v //var/run/docker.sock:/var/run/docker.sock \
    -v //opt/openvidu/recordings:/opt/openvidu/recordings \
openvidu/openvidu-server-kms:2.15.0
```