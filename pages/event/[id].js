import React from 'react';
import EventDetails from '../../src/pagesComponent/eventDetails';

const eventData = {
  tags: ['bonus'],
  locationCoordinates: [67.114544, 24.870862],
  sponsors: ['1667001427737-pexels-jd-danny-2385477.jpg', '1667001427739-Untitled-1 copy.png'],
  _id: '635c6c53933557eec0efb3e0',
  name: 'Bonus ',
  description: '<p><strong>Description</strong></p>',
  image: '1667001427732-pexels-julia-sakelli-1532244.jpg',
  startDate: '2022-10-29T07:00:00.000Z',
  endDate: '2022-10-29T07:00:00.000Z',
  totalTickets: 50,
  remainingTickets: 24,
  location: 'Karachi, Sindh, Pakistan',
  venue: 'Venue',
  price: 20,
  address: 'Plot 326 flat korangi crossing Karachi',
  phone: '03182263109',
  email: 'S.m.sami125@gmail.com',
  facebook: '',
  twitter: '',
  insta: '',
  linkdin: '',
  snapchat: '',
  whatsApp: '',
  speakers: [
    {
      _id: '635c79188a7ac4ff6cc0b137',
      image: '1667001427741-template_0.jpg',
      name: 'Speaker K',
      description: 'Des',
      occupation: 'Occupation',
      facebook: 'fff',
      twitter: 'www',
      insta: 'wwww',
      linkdin: 'wwww',
      snapchat: 'wwww',
      whatsApp: 'wwww',
    },
    {
      _id: '635c79188a7ac4ff6cc0b138',
      image: '1667001427743-download.jpg',
      name: 'Ali',
      description: 'Speaker',
      occupation: 'Killer',
      facebook: 'facebook',
      twitter: 'twitter',
      insta: 'insta',
      linkdin: 'lindkin',
      snapchat: 'snapchat',
      whatsApp: 'whsp',
    },
  ],
  schedule: [
    {
      _id: '635c79188a7ac4ff6cc0b139',
      startDate: '2022-10-29T06:00:00.000Z',
      topic: 'topic',
      topicDetails: 'Details',
      speaker: 'Speaker',
    },
    {
      _id: '635c79188a7ac4ff6cc0b13a',
      startDate: '2022-10-29T07:00:00.000Z',
      topic: 'topic',
      topicDetails: 'Details',
      speaker: 'Speaker',
    },
  ],
  __v: 0,
};

export default function EventDetailsPage(props) {
  return <EventDetails event={eventData} />;
}
