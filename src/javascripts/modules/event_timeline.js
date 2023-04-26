import React from "react";
import styled from "styled-components";
import { ThemeProvider, DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { Timeline } from "@zendeskgarden/react-accordions";
import { Span } from "@zendeskgarden/react-typography";
import { toSentenceCase, formatDate } from "../lib/helpers";

const StyledSpan = styled(Span).attrs({ isBold: true })`
  display: block;
`;

export default function EventTimeline({ events }) {
  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME }}>
      <Timeline>
        {events.map((event) => {
          return (
            <Timeline.Item key={event.id} data-event-id={event.id}>
              <Timeline.Content>
                <StyledSpan data-type="type">
                  {toSentenceCase(event.type)}
                </StyledSpan>
                <Span hue="grey" data-type="date">
                  {formatDate(event.created_at)}
                </Span>
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </ThemeProvider>
  );
}
