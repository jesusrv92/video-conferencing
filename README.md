# Video Conferencing React / [Demo](https://video-conferencing-react.web.app/)

This project uses [OpenVidu](https://openvidu.io/index) on the backend to handle the connection with peers; streaming directioning and storage of calls.

To run a test environment, run the following command

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

This project uses [create-react-app](https://create-react-app.dev/) as a base for the frontend.