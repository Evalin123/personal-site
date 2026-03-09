import '@/assets/styles/components/articles/WebSocket.scss';

export default function WebSocket() {
  return (
    <article className="websocket">
      <header className="websocket__header">
        <h1 className="websocket__title">WebSocket: Real-Time Communication Made Simple</h1>
      </header>

      <div className="websocket__content">
        <div className="websocket__tldr">
          <p>
            In today's highly connected and always-online world, we expect information to be
            available instantly. WebSocket is one of the key technologies that enable real-time
            communication in web applications, providing seamless and efficient updates without the
            need for constant polling.
          </p>
        </div>

        <section className="websocket__section">
          <h2 className="websocket__heading">Why Isn't HTTP Enough for Real-Time Communication?</h2>
          <p>
            Before we dive into WebSocket, let's take a look at how traditional HTTP-based solutions
            handle real-time communication. While HTTP works well for many applications, it has
            limitations when it comes to instant updates.
          </p>

          <h3 className="websocket__subheading">Polling</h3>
          <p>
            In Polling, the client sends a request to the server and waits for a response. If no new
            data is available, the server returns an empty response. The main issue with Polling is
            that the client continuously makes requests to the server, even when there is no new
            data. This leads to unnecessary empty responses, causing HTTP overhead and reducing
            efficiency.
          </p>

          <h3 className="websocket__subheading">Long Polling</h3>
          <p>
            In Long Polling, when the server doesn't have data available for the client, instead of
            sending an empty response, it holds the request open and waits until data becomes
            available. Once data is available, the server sends the response to the client.
          </p>
          <p>
            After receiving the response, the client immediately sends another request to the
            server, ensuring that there is always an open connection to deliver new data as soon as
            it becomes available. This reduces unnecessary empty responses and minimizes HTTP
            overhead compared to traditional Polling.
          </p>

          <h3 className="websocket__subheading">Server-Sent Events</h3>
          <p>
            With SSE, the client establishes a persistent connection to the server. This connection
            remains open, allowing the server to push updates to the client whenever new data is
            available.
          </p>
          <p>
            A key difference between SSE and WebSocket is that SSE is unidirectional, meaning data
            can only flow from the server to the client. In contrast, WebSocket is bidirectional,
            allowing both the client and server to send data to each other at any time. This makes
            WebSocket more suitable for applications that require real-time, two-way communication,
            such as chat apps or online games.
          </p>
        </section>

        <section className="websocket__section">
          <h2 className="websocket__heading">
            How WebSocket Overcomes the Limitations of Traditional Methods?
          </h2>
          <p>
            WebSocket enables bidirectional, real-time communication between the client and the
            server, providing more efficient and low-latency data transmission than traditional HTTP
            methods.
          </p>

          <h3 className="websocket__subheading">Understanding the WebSocket Handshake</h3>
          <p>
            WebSocket is an advanced technology that allows for real-time, interactive
            communication. Unlike traditional HTTP, which follows a request-response model,
            WebSocket maintains a persistent connection for continuous data flow.
          </p>
          <p>
            The WebSocket handshake starts with the client sending a regular HTTP request with an{' '}
            <code>Upgrade: websocket</code> header. If the server supports WebSocket, it responds
            with a <code>101 Switching Protocols</code> status, confirming the protocol switch. Once
            this handshake is completed, a full-duplex communication channel is established.
          </p>
        </section>

        <section className="websocket__section">
          <h2 className="websocket__heading">Advantages and Disadvantages of WebSocket</h2>

          <h3 className="websocket__subheading">Advantages</h3>
          <ul className="websocket__list">
            <li>
              <strong>Real-time, Bidirectional Communication:</strong> WebSocket allows continuous
              communication between the client and server, reducing the need for frequent requests.
              Ideal for real-time applications such as live chats and online gaming.
            </li>
            <li>
              <strong>Reduced Overhead:</strong> WebSocket eliminates the need for traditional HTTP
              requests, significantly lowering data load and improving efficiency.
            </li>
            <li>
              <strong>Low Latency:</strong> Maintaining a persistent connection reduces the latency
              involved in creating new connections for each data exchange.
            </li>
          </ul>
        </section>

        <section className="websocket__section">
          <h2 className="websocket__heading">How to Keep a WebSocket Connection Alive?</h2>
          <p>
            To keep a WebSocket connection active, it's essential to implement strategies to prevent
            the connection from being closed due to inactivity. One of the key approaches is the
            heartbeat mechanism.
          </p>

          <h3 className="websocket__subheading">Heartbeat Mechanism</h3>
          <p>
            This mechanism ensures the WebSocket connection remains open by sending small packets
            periodically. The client sends a Ping request, and the server responds with a Pong. If
            the client doesn't receive a Pong in a specified time frame, it assumes the connection
            has been lost and may attempt to reconnect. Heartbeat intervals are usually set between
            30 seconds to 1 minute, but can be adjusted as needed.
          </p>
        </section>

        <section className="websocket__section">
          <h2 className="websocket__heading">WebSocket with Socket.io Client Example</h2>

          <h3 className="websocket__subheading">1. Initializing WebSocket Connection</h3>
          <p>
            To start using WebSocket, the first step is to establish a connection between the client
            and the server. Here's the code to initialize the connection:
          </p>
          <pre className="websocket__code">
            <code>{`const io = require('socket.io-client');
// Initialize WebSocket
const ws = io('ws://localhost:3000', { transports: ['websocket'] });`}</code>
          </pre>
          <p>
            This connection stays open for ongoing, real-time communication between the client and
            server.
          </p>

          <h3 className="websocket__subheading">2. Handling WebSocket Events</h3>
          <p>
            Once connected, you can listen for events and trigger actions such as sending a message
            to the server:
          </p>
          <pre className="websocket__code">
            <code>{`// WebSocket Connection Event
ws.on('connect', () => {
 console.log('Successfully connected to WebSocket!');
 
 // Send a message to the server once connected
 const message = 'Hello, WebSocket!';
 sendMessage('getMessage', message);
});`}</code>
          </pre>
          <p>
            In this example, once the connection is established, the WebSocket automatically sends a
            "Hello, WebSocket!" message to the server.
          </p>

          <h3 className="websocket__subheading">3. Receiving Messages from the Server</h3>
          <p>
            With WebSocket, receiving messages from the server is easy. You simply listen for
            specific events:
          </p>
          <pre className="websocket__code">
            <code>{`// Listen for messages from the server
ws.on('getMessage', (message) => {
 console.log('Received message: ', message);
});`}</code>
          </pre>
          <p>
            Whenever the server sends a "getMessage" event, the client logs the message in
            real-time.
          </p>

          <h3 className="websocket__subheading">4. Disconnecting WebSocket</h3>
          <p>To handle disconnections, listen for the disconnect event:</p>
          <pre className="websocket__code">
            <code>{`// Handle WebSocket disconnection
ws.on('disconnect', () => {
 console.log('Disconnected from WebSocket');
});`}</code>
          </pre>
          <p>This ensures you know when the WebSocket connection is no longer active.</p>

          <h3 className="websocket__subheading">5. Sending Messages to the Server</h3>
          <p>
            To send a message to the server, create a function that emits an event with the message:
          </p>
          <pre className="websocket__code">
            <code>{`// Send a message to the WebSocket server
function sendMessage(eventName, message) {
 console.log(\`Sending message: \${message}\`);
 ws.emit(eventName, message);
}`}</code>
          </pre>
          <p>This allows you to send data to the server, enabling real-time communication.</p>

          <h3 className="websocket__subheading">6. Disconnecting WebSocket after a Delay</h3>
          <p>Sometimes, you may want to disconnect WebSocket after a certain delay:</p>
          <pre className="websocket__code">
            <code>{`// Example: Disconnect WebSocket after a delay
setTimeout(() => {
 ws.emit('disConnection', 'Disconnecting from server...');
 console.log('WebSocket Disconnected');
}, 5000);`}</code>
          </pre>
          <p>
            This example disconnects from the WebSocket server after 5 seconds, simulating a
            graceful shutdown.
          </p>
        </section>

        <section className="websocket__section">
          <h2 className="websocket__heading">WebSocket Security Considerations</h2>
          <p>
            WebSocket security is crucial because it doesn't have built-in encryption like HTTP. To
            protect against man-in-the-middle (MITM) attacks, always use the{' '}
            <strong>WSS (WebSocket Secure)</strong> protocol, which ensures encrypted communication.
          </p>
          <p>
            Additionally, validate incoming data to prevent XSS and CSRF attacks. Implement
            token-based authentication (e.g., JWT) and use measures such as rate limiting to enhance
            security.
          </p>
        </section>

        <section className="websocket__section">
          <h2 className="websocket__heading">Conclusion</h2>
          <p>
            WebSocket is a powerful technology that enables real-time, bidirectional communication
            between clients and servers. Unlike traditional HTTP, which is limited in handling
            real-time interactions, WebSocket provides efficient, low-latency data transmission.
          </p>
          <p>
            It's an excellent choice for applications like chat services, live updates, and
            real-time gaming. However, just like any other technology, it's important to implement
            security measures, such as encryption and authentication, to ensure the safety of
            WebSocket connections.
          </p>
          <p>
            By understanding how WebSocket works and recognizing its potential applications, you can
            leverage this technology to build faster, more interactive web applications.
          </p>
          <p>
            Whether you're creating live chat features or pushing instant notifications, WebSocket
            can significantly improve user experiences by enabling seamless communication in
            real-time.
          </p>
        </section>

        <section className="websocket__section">
          <hr className="websocket__divider" />
          <div className="websocket__external-link">
            <p>
              <strong>📝 Read the original article on Medium:</strong>
            </p>
            <a
              href="https://medium.com/@evalin8/websocket-vs-http-whats-the-difference-and-when-to-use-websocket-e8f0b8c2cee2"
              target="_blank"
              rel="noreferrer"
              className="websocket__link"
            >
              WebSocket vs HTTP: What's the Difference and When to Use WebSocket? →
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
