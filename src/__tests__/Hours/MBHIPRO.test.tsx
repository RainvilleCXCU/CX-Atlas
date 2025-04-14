import { render, fireEvent, screen } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import MBHIPRO from "../../components/Hours/MBHIPRO";
import { mockHoursOpen, mockHoursClosed } from "__mocks__/Hours/hours.mock";

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
  });

describe("<MBHIPRO />", () => {
  it("Available should display if open", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockHoursOpen));

    await act( async () => render(<MBHIPRO classNames={'cx-hours'} id="chat" locationId="Live Chat" code="mbhi_ifopen">Available Hours</MBHIPRO>));
    const divElement = await screen.findByText('Available Hours');
    
    expect(divElement).toBeTruthy();
  });

  it("Available should not display if not open", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockHoursClosed));

    await act( async () => render(<MBHIPRO classNames={'cx-hours'} id="chat" locationId="Live Chat" code="mbhi_ifopen">Available Hours</MBHIPRO>));
    const divElement = await screen.queryByText('Available Hours');

    expect(divElement).toBeNull();
  });


  it("Not Available should not display if not open", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockHoursClosed));

    await act( async () => render(<MBHIPRO classNames={'cx-hours'} id="chat" locationId="Live Chat" code="mbhi_ifclosed">Not Available Hours</MBHIPRO>));
    const divElement = await screen.queryByText('Not Available Hours');

    expect(divElement).toBeTruthy();
  });


  it("Not Available should not display if open", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockHoursOpen));

    await act( async () => render(<MBHIPRO classNames={'cx-hours'} id="chat" locationId="Live Chat" code="mbhi_ifclosed">Not Available Hours</MBHIPRO>));
    const divElement = await screen.queryByText('Not Available Hours');

    expect(divElement).toBeNull();
  });
  
});