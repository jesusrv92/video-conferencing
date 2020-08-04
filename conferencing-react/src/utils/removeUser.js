/* 
Sends signal to user to remove it. This is done by sending a 
removed signal using the OpenVidu Session API. Once the target
user receives the removed signal, it will run the leaveSession
function found in the OpenVidu Session API.

Beware, if the user isn't valid (meaning that it doesn't contain a stream object property
that has a connection property) it will send the signal to all users and all users will
leave the call.
*/
export default async function removeUser(session, user) {
    try {
        await session.signal({
            to: [user.stream.connection],                 // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'removed'             // The type of message (optional)
        });
        console.log('Sent removal signal to user');
    }
    catch (error) {
        console.error(error);
    }
}