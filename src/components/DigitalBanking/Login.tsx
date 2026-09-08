import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { parseHtml } from "lib/parser";
import Loading from "components/common/loading";
import Form from "components/Forms/Form";
import Container from "components/Blocks/Container";
import Columns from "components/Blocks/Columns";
import Column from "components/Blocks/Column";
import AppLinks from "components/Device/AppLinks";
export interface MemberProps {
  id?: string;
  widgetHtml?: string;
}

// const DB_LOGIN_SCREEN_QUERY = gql`
//   query DBLoginScreen() {
//     widgetSettings {
//       dbLoginScreen
//     }
//   }
// `;

function DBLogin({
  id = "db-login",
  widgetHtml: widgetHtmlProp
}: MemberProps): JSX.Element {
  const hasWidgetHtmlProp = widgetHtmlProp !== undefined;
//   const { data, loading } = useQuery(DB_LOGIN_SCREEN_QUERY, {
//     skip: hasWidgetHtmlProp,
//   });

//   const widgetHtml = hasWidgetHtmlProp ? widgetHtmlProp : data?.widgetSettings?.mantlMemberScreen;

//   if (widgetHtml) {
//     return <>{parseHtml(widgetHtml)}</>;
//   }

  return (
    <>
        <Container align="full" classNames={`no-margin`}>
            <Columns classNames={`no-margin`}>
                <Column classNames={`no-margin`}>
                    <div className="db-login__header">
                        <h2 className="db-login__title">Digital Banking Login</h2>
                        <p className="db-login__description">Please enter your username and password to access your account.</p>
                    </div>
                    <form className="login-form" action="https://connexusstaging.orb.alkamitech.com/Authentication/Username" method="POST">
                        <label htmlFor="UserName">Username:</label>
                        <input type="text" id="UserName" name="UserName" className="ninja-forms-field nf-element" required />
                        <label htmlFor="Password">Password:</label>
                        <input type="password" id="Password" name="Password" className="ninja-forms-field nf-element" required />
                        <div className="cx-button__wrapper cx-button__wrapper--right slim-padding--vertical-top">
                            <button type="submit" className="cx-button cx-button--compact cx-button--color-positive">Log in</button>
                        </div>
                    </form>
                </Column>
            </Columns>
        </Container>

        <AppLinks />
    </>
  );
}


export default DBLogin;
