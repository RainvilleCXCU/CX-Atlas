import React from "react";
import { useEffect } from "react";

export interface Props {
	data: any;
}

function LocationDetails({ data }: Props): JSX.Element {

  const branch = data?.[16] //This is just to hold some dynamic data for a single branch in the array from 'data'
  console.log(branch)

	return (
    
    <div id="wpsl-branch-details" className="">
      <div id="wpsl-store">
        <div className="cx-location-details__title cx-h4">
          <button
            className="cx-modal__close"
            data-modal-target="#wpsl-branch-details"
          ></button>
          Location Details
        </div>{" "}
        <div className="cx-location-details__content">
          <div className="cx-branch-content__header wpsl-location--section">
            <div className="cx-location-listing__item--address">
              <span className="wpsl-name">
                <strong>{branch?.store}</strong>
              </span>
              <br/>
              <span className="wpsl-street">{branch?.address}</span>
              <br/>
              <span>{branch?.city}, {branch?.state} {branch?.zip}</span>
            </div>
            <div className="cx-location-listing__item--icon">
              <img
                src="https://www.connexuscu.org/wp-content/uploads/2022/02/LogoConnexus.svg"
                width="145"
                height="54"
                alt="Connexus Credit Union"
                title="Connexus Credit Union — High Yields, Low Rates, Online Services"
              />
            </div>
          </div>

          <div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
            <details open>
              <summary className="gb-accordion-title">
                <span className="wpsl-hours cx-h5">Hours of Operation (CT)</span>
              </summary>
              <div className="gb-accordion-text">
                <div className="wpsl-hours-wrapper">
                  <span className="wpsl-hours wpsl-days">
                    <div className="wpsl-hours-heading">&nbsp;</div>
                    <table className="mabel-bhi-businesshours">
                      <tbody>
                        <tr>
                          <td className="mabel-bhi-day">Mon</td>
                        </tr>
                        <tr className="mbhi-is-current">
                          <td className="mabel-bhi-day">Tue</td>
                        </tr>
                        <tr>
                          <td className="mabel-bhi-day">Wed</td>
                        </tr>
                        <tr>
                          <td className="mabel-bhi-day">Thurs</td>
                        </tr>
                        <tr>
                          <td className="mabel-bhi-day">Fri</td>
                        </tr>
                        <tr>
                          <td className="mabel-bhi-day">Sat</td>
                        </tr>
                        <tr>
                          <td className="mabel-bhi-day">Sun</td>
                        </tr>
                      </tbody>
                    </table>
                  </span>

                  <span className="wpsl-hours hide-days">
                    <div className="wpsl-hours-heading">Lobby</div>
                    <div dangerouslySetInnerHTML={{ __html: branch?.lobby_hours_html }} />
                  </span>

                  <span className="wpsl-hours hide-days">
                    <div className="wpsl-hours-heading">Drive-Thru</div>
                    <div dangerouslySetInnerHTML={{ __html: branch?.drive_thru_hours_html }} />
                  </span>
                </div>
              </div>
            </details>
          </div>

          <div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
            <details>
              <summary className="gb-accordion-title">
                <span className="wpsl-hours cx-h5">Holiday Hours</span>
              </summary>
              <div className="gb-accordion-text">
                <div className="wpsl-hours-wrapper wpsl-special-hours">
                  <table className="mabel-bhi-businesshours">
                    <tbody>
                      <tr className="mb-bhi-holiday">
                        <td>New Year’s Day - January 1</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>Memorial Day - May 29</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>Independence Day - July 4</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>Labor Day - September 4</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>Thanksgiving Day - November 23</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>Christmas Eve - December 24</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>Christmas Day - December 25</td>
                        <td>Closed</td>
                      </tr>
                      <tr className="mb-bhi-holiday">
                        <td>New Year’s Eve - December 31</td>
                        <td>Closed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          </div>

          <div className="wp-block-genesis-blocks-gb-accordion cx-accordion__brand gb-block-accordion wpsl-location--section">
            <details>
              <summary className="gb-accordion-title">
                <span className="wpsl-hours cx-h5">Services &amp; Amenities</span>
              </summary>
              <div className="gb-accordion-text">
                <span className="wpsl-services">
                  {branch?.services ? <div dangerouslySetInnerHTML={{ __html: branch?.services }} /> : "Unavailable" }
                </span>
              </div>
            </details>
          </div>

          <div className="cx-location-content__footer u-is-hidden">
            <div className="cx-location-content__footer--btn">
              <a
                href={`tel:${branch?.phone}`}
                className="cx-button cx-button--compact cx-button--icon cx-button--icon-call"
              >
                Call
              </a>
            </div>
            <div className="cx-location-content__footer--btn">
              <a
                href={`https://maps.google.com/maps?saddr=&amp;daddr=${branch?.address},${branch?.city} ${branch?.state} ${branch?.zip}`}
                target="_blank"
                className="cx-button cx-button--compact cx-button--outlined cx-button--icon cx-button--icon-directions-brand"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
        <div className="cx-location-content__footer">
          <div className="cx-location-content__footer--btn">
            <a
              href={`tel:${branch?.phone}`}
              className="cx-button cx-button--compact cx-button--icon cx-button--icon-call"
            >
              Call
            </a>
          </div>
          <div className="cx-location-content__footer--btn">
            <a
              href={`https://maps.google.com/maps?saddr=&daddr=${branch?.address},${branch?.city} ${branch?.state} ${branch?.zip}`}
              target="_blank"
              className="cx-button cx-button--compact cx-button--outlined cx-button--icon cx-button--icon-directions-brand"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationDetails;
