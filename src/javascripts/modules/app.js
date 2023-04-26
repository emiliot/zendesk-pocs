import React from "react";
import { render } from "react-dom";
import { SupportSdk } from "@taxfix/operations-sdk";
import { resizeContainer } from "../lib/helpers";
import EventTimeline from "./event_timeline";

const MAX_HEIGHT = 1000;

const BASE_URL = "https://integration.dev.taxfix.tech";

class App {
  constructor(client, appData) {
    this._client = client;
    this._appData = appData;
    this.initializePromise = this.init();
  }

  async init() {
    const requesterId = (await this._client.get("ticket.requester.id"))[
      "ticket.requester.id"
    ];
    const eventRequestOptions = {
      url: `/api/v2/users/${requesterId}/events`,
      data: `page[size]=5`,
    };

    const events = await this._client.request(eventRequestOptions);
    // Sorts events by created_at timestamp
    const sortedEvents = events.events.sort((a, b) =>
      a.created_at > b.created_at ? 1 : -1
    );
    const container = document.querySelector(".main");


    const token = "Token 998746fb6f8735a43762a092a63de928b59731e5";
    // const data = await SupportSdk.getUserCsAttributes(BASE_URL, token, { userId: 1005374 })
    const data = await SupportSdk.getFaqs(BASE_URL, { countryCode: 'DE', language: 'en' })
    console.log('Taxfix Data', JSON.stringify(data, null, 2))

    render(<EventTimeline events={sortedEvents} />, container);
    return resizeContainer(this._client, MAX_HEIGHT);
  }
}

export default App;
