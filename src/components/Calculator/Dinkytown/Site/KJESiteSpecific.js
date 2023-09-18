KJE.sEmailFooter = "\n\n-------------------------------------------------------------\nConnexus Credit Union http://connexuscu.org\n-------------------------------------------------------------\n"
// Calculator backgrounds and colors
KJE.ErrorBackground="#FF7777"; // backgroundColor
KJE.IncompleteBackground="#FFFF77";
KJE.ClearColor="#FFFFFF";
KJE.colorList=["","#E7F1ED","#cccccc","#BE4262","#FABB50","#DDCCDD","#CCCCCC","#CCCCDD","#CCDDCC","#CCDDDD","#CCCCDD"];

// Report Header and Footer
KJE.ReportHeader="<div class='KJEReportTitleBlock'><div class='KJEReportTitle'>**REPORT_TITLE**</div><br><div class=KJELogo><img src='logo.png' class=KJELogo alt='Connexus Credit Union'></div>connexuscu.org</div>";
KJE.ReportFooter="<div class=KJECenter><p><span class='KJEBold'>Connexus Credit Union</span><br>P.O. Box 8026<br>Wausau, WI 54402</p><p class='KJEReportFooter KJECenter'>Information and interactive calculators are made available to you only as self-help tools for your independent use and are not intended to provide investment or tax advice. We cannot and do not guarantee their applicability or accuracy in regards to your individual circumstances. All examples are hypothetical and are for illustrative purposes. We encourage you to seek personalized advice from qualified professionals regarding all personal finance issues.</p></div><!--EXTRA_FOOTER-->";

// Graph fonts, colors and heights
KJE.gFont           = ["Arial","Arial","Arial"];
KJE.gFontStyle      = ["bold","bold",""];
KJE.gFontSize       = [13,10,10];
KJE.gHeight               = 250;
KJE.gHeightReport         = 350;
KJE.gColorBackground      ="#FFFFFF";
KJE.gColorForeground      ="#000000";
KJE.gColorGrid            ="#BBBBBB";
KJE.gColorGridBackground1 ="#FFFFFF";
KJE.gColorGridBackground2 ="#FFFFFF";
KJE.gColorAxisLine        ="#666666";
KJE.gColorText            ="#000000";

KJE.gColorList            = ["#006939","#81BC00","#006939","#81BC00","#5f007f","#F15A22","#B72467","#6DC8BF","#FF0000","#ff00ff","#ffff00","#00ffff","#7f007f","#7f0000","#007f7f","#0000ff","#00c8ff","#60ffff","#bfffbf","#ffff90","#a0c8ef"];


//graph shadow colors
KJE.gLegend._sSHADOW_COLOR="#E7F1ED";
KJE.gGraphColumn._sSHADOW_COLOR="#FFFFFF";

//hide definitions section
KJE.ShowDefinitions = false;

//auto close graphcs
KJE.parameters.set("GRAPH_OPEN1",false);
KJE.parameters.set("GRAPH_OPEN2",false);
KJE.parameters.set("GRAPH_OPEN3",false);

//set default rates
KJE.Default.MortgageTermMax = 30;
KJE.Default.MortgageRateMax = 15;
KJE.Default.MortgageMax = 1000000;
KJE.Default.InvestSliderRateMax = 6;
KJE.Default.RateAuto = 3.99;
KJE.Default.RateFix30 = 4.00;
KJE.Default.RateAdj = 4.50;

export default {};