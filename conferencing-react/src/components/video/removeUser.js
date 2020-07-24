export default async function removeUser(session, user) {
    // TODO: EMIT SIGNAL TO USER TO LEAVE SESSION
    try {
        await session.signal({
            to: [user],                 // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'removed'             // The type of message (optional)
        });
        console.log('Sent removal signal to user');
    }
    catch (error) {
        console.error(error);
    }
}