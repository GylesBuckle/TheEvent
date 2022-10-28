import Link from 'next/link';
import React from 'react';

export default function adminDashboard() {
  return (
    <div>
      <Link href="/create-event">Create Event</Link>
    </div>
  );
}
