KJE.parameters.set("COMPOUND_INTEREST", KJE.CertDepositCalc.COMPOUND_ANNUALLY);
KJE.parameters.set("MIN_STARTING_AMOUNT", 5000);
KJE.parameters.set("MONTHS", 15);
KJE.parameters.set("PERCENT_DECIMALS", 3);
//KJE.parameters.set("RATE_OF_RETURN", 4.85);
KJE.parameters.set("TOTAL_YIELD_HIDE", true);
KJE.parameters.set("STARTING_AMOUNT", 10000);
KJE.parameters.set("MSG_MONTHS", "Length of certificate (in months)");
KJE.parameters.set("MSG_RATE_OF_RETURN", "APY");
KJE.parameters.set("MSG_REPORT_COL3", "Dividends");
KJE.parameters.set("MSG_TOTAL_YIELD", "Total annual yield");

KJE.CalculatorTitle = "Certificate Calculator";

module.exports = {
  KJE
}
/**V3_CUSTOM_CODE**/
/* <!--
  Financial Calculators, &copy;1998-2020 KJE Computer Solutions, Inc.
  For more information please see:
  <A HREF="https://www.dinkytown.net">https://www.dinkytown.net</A>
 -->
 */
