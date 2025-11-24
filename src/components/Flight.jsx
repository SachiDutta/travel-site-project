import React from 'react';

export default function Flight() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Flights</h1>
      <p>
        This is the Flights page. You can use the booking widget on the
        <a href="/bookings" style={{ marginLeft: 8 }}>Bookings</a> page to search flights,
        or return to the <a href="/">home page</a>.
      </p>
    </div>
  );
}
