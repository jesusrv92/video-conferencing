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