
KJE.CompareSavingsCalc=function(){this.COMPARE_COUNT=KJE.parameters.get("COMPARE_COUNT",3);this.MSG_FLAT_TITLE=KJE.parameters.get("MSG_FLAT_TITLE","A Flat Fee May Save Between END_FEE2 and END_FEE3 over YEARS Years.");this.MSG_AT_START_DESC=KJE.parameters.get("MSG_AT_START_DESC","at the start of each period");this.MSG_AT_END_DESC=KJE.parameters.get("MSG_AT_END_DESC","at the end of each period");this.MSG_START=KJE.parameters.get("MSG_START","start");this.MSG_END=KJE.parameters.get("MSG_END","end");this.bUseFees=KJE.parameters.get("USE_FEES",false);this.SIMPLE=KJE.parameters.get("SIMPLE",true);this.cats=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"];this.ANNUAL_RATE=0;this.COMPOUND_INDEX=KJE.parameters.get("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY);this.FREQ_INDEX=KJE.Default.COMPOUND_ANNUALLY;this.PAYMENTS_AT_START=true;this.FLAT_FEE1=0;this.FLAT_FEE2=0;this.FLAT_FEE_CUTOFF=0;var a=this.COMPARE_COUNT;if(a<2){a=2}this.COMPARE_COUNT=a;this.DR_INTEREST=new Array(a);this.DR_TOTAL_INTEREST=new Array(a);this.DR_BALANCE=new Array(a);this.RATE_OF_RETURN=KJE.FloatArray(a);this.RATE_OF_FEE=KJE.FloatArray(a);this.FLAT_RATE_OF_FEE=KJE.FloatArray(a);this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN=KJE.FloatArray(a);this.TOTAL_AT_END_OF_INVESTMENT=KJE.FloatArray(a);this.sSchedule=new KJE.Repeating();this.Heading=new Array(a)};KJE.CompareSavingsCalc.prototype.clear=function(){this.DEPOSIT_FREQUENCY=1;this.COMPOUND_INTEREST=1;this.STARTING_AMOUNT=0;this.ADDITIONAL_CONTRIBUTIONS=0;this.YEARS=0;var a=this.RATE_OF_RETURN;var c=a.length;for(var b=0;b<c;b++){a[b]=0}};KJE.CompareSavingsCalc.prototype.calculate=function(C){var g=KJE;var q=this.STARTING_AMOUNT;var f=this.ADDITIONAL_CONTRIBUTIONS;var E=this.YEARS;var L=this.FLAT_FEE1;var K=this.FLAT_FEE2;var k=this.FLAT_FEE_CUTOFF;var l=this.FLAT_RATE_OF_FEE;var a=this.RATE_OF_FEE;var s=this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN;var x=this.TOTAL_AT_END_OF_INVESTMENT;var r=this.RATE_OF_RETURN;var p=this.DR_INTEREST;var h=this.DR_TOTAL_INTEREST;var t=this.DR_BALANCE;var A=this.COMPARE_COUNT;for(var H=0;H<A;H++){s[H]=0;x[H]=0}var e=KJE.Default.COMPOUND_FREQ[this.COMPOUND_INDEX];var F=KJE.Default.SAVE_FREQ[this.FREQ_INDEX];this.COMPOUND_DESC=KJE.Default.COMPOUND_DESC[this.COMPOUND_INDEX];this.FREQ_DESC=KJE.Default.SAVE_DESC[this.FREQ_INDEX];var v=0;var o=0;var z=0;var d=100;for(var H=0;H<A;H++){if(L>0&&K>0&&l[H]){a[H]=(q>=k?K:L)}if(this.bUseFees){r[H]=this.ANNUAL_RATE-(l[H]?0:a[H])}if(z<r[H]){z=r[H];v=H}if(d>r[H]){d=r[H];o=H}}z=r[v]/100;d=r[o]/100;var j=Math.round(E);for(var H=0;H<A;H++){s[H]=q+(f*F*E);t[H]=KJE.FloatArray(j);h[H]=KJE.FloatArray(j);p[H]=KJE.FloatArray(j);t[H]=KJE.FloatArray(j);var J=0;var D=0;var u=0;var B=0;var m=0;if(e==F){J=(r[H]/F)/100}else{if(e==1){u=r[H]/100}else{u=1/Math.pow((1+r[H]/(e*100)),(-1*e))-1}J=Math.pow(1+(u),1/F)-1}var I=F*E;var b=0;x[H]=q;for(var G=0;G<I;G++){if(this.PAYMENTS_AT_START){x[H]+=f;D=g.round(J*x[H],2);B+=D;x[H]+=D}else{D=g.round(J*x[H],2);B+=D;x[H]+=f;x[H]+=D}if(((G+1)%F)==0){var c=0;if(L>0&&K>0&&l[H]){c=(x[H]>=k?K:L)}x[H]-=(l[H]?c:0);B-=(l[H]?c:0);t[H][m]=x[H];p[H][m]=B;b+=B;h[H][m]=b;B=0;m++}}}var y=KJE.replace("END_FEE2",g.dollars(x[0]-x[1]),this.MSG_FLAT_TITLE);y=KJE.replace("END_FEE3",g.dollars(x[0]-x[2]),y);this.MSG_FLAT=KJE.replace("YEARS",g.number(E),y);var H=0;this.DIFFERENCE=(t[v][j-1]-t[o][j-1]);if(C){var w=this.sSchedule;w.clearRepeat();for(var H=0;H<A;H++){this.Heading[H]={sCell:KJE._sHeadingUnderline,sContent:KJE.replace("RATE_OF_RETURN",g.percent(r[H]/100,2),KJE.replace("PRODUCT_NAME",w.sReportCol("",6),w.sReportCol("RATE_OF_RETURN APY",5))),sFormat:"COLSPAN=2 scope='colgroup'"}}w.addHeader("&nbsp;","&nbsp;",this.Heading[0],this.Heading[1],(A>2?this.Heading[2]:null));w.addHeader(w.sReportCol("Year",1),w.sReportCol("Additions",2),w.sReportCol("Interest",3),w.sReportCol("Balance",4),w.sReportCol("Interest",3),w.sReportCol("Balance",4),(A>2?w.sReportCol("Interest",3):null),(A>2?w.sReportCol("Balance",4):null));w.addRepeat("&nbsp;","&nbsp;","&nbsp;",g.dollars(q,2),"&nbsp;",g.dollars(q,2),(A>2?"&nbsp;":null),(A>2?g.dollars(q,2):null));for(var H=0;H<j;H++){w.addRepeat((H+1),g.dollars(F*f,2),g.dollars(p[0][H],2),g.dollars(t[0][H],2),g.dollars(p[1][H],2),g.dollars(t[1][H],2),(A>2?g.dollars(p[2][H],2):null),(A>2?g.dollars(t[2][H],2):null))}}this.COMPOUND_INTEREST=e;this.DEPOSIT_FREQUENCY=F;this.HIGH_RATE_INT=v;this.LOW_RATE_INT=o;this.HIGH_RATE=z;this.LOW_RATE=d};KJE.CompareSavingsCalc.prototype.formatReport=function(b){b.replace("DEPOSIT_TYPE",(this.PAYMENTS_AT_START?this.MSG_AT_START_DESC:this.MSG_AT_END_DESC));b.replace("MSG_FLAT",this.MSG_FLAT);b.percent("ANNUAL_RATE",this.ANNUAL_RATE/100,2);b.dollars("STARTING_AMOUNT",this.STARTING_AMOUNT);b.dollars("ADDITIONAL_CONTRIBUTIONS",this.ADDITIONAL_CONTRIBUTIONS);b.replace("DEPOSIT_FREQUENCY",this.FREQ_DESC);b.replace("YEARS",KJE.getTermLabel(this.YEARS*12,false));b.percent("HIGH_RATE",this.HIGH_RATE,2);b.percent("LOW_RATE",this.LOW_RATE,2);b.percent("HIGH_FEE",this.RATE_OF_FEE[this.LOW_RATE_INT]/100,2);if(this.FLAT_RATE_OF_FEE[this.HIGH_RATE_INT]){b.dollars("LOW_FEE",this.RATE_OF_FEE[this.HIGH_RATE_INT])}else{b.percent("LOW_FEE",this.RATE_OF_FEE[this.HIGH_RATE_INT]/100)}b.dollars("DIFFERENCE",this.DIFFERENCE);b.replace("PAYMENT_TYPE",(this.PAYMENTS_AT_START?this.MSG_START:this.MSG_END));for(var a=0;a<this.RATE_OF_RETURN.length;a++){b.returnRate("RATE_OF_RETURN"+(a+1),this.RATE_OF_RETURN[a]/100);if(this.FLAT_RATE_OF_FEE[a]==true){b.dollars("RATE_OF_FEE"+(a+1),this.RATE_OF_FEE[a])}else{b.percent("RATE_OF_FEE"+(a+1),this.RATE_OF_FEE[a]/100,2)}b.dollars("TOTAL_AMOUNT_YOU_HAVE_PAID_IN"+(a+1),this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN[a]);b.dollars("TOTAL_AT_END_OF_INVESTMENT"+(a+1),this.TOTAL_AT_END_OF_INVESTMENT[a])}b.replace("COMPOUND_INTEREST",KJE.Default.COMPOUND_DESC[this.COMPOUND_INDEX]);b.replace("COMPOUND_SELECTION_LOWER",KJE.Default.COMPOUND_SELECTIONS[this.COMPOUND_INDEX].toLowerCase());b.dollars("TOTAL_HIGH_AMOUNT",this.TOTAL_AT_END_OF_INVESTMENT[this.HIGH_RATE_INT]);b.replace("**REPEATING GROUP**",this.sSchedule.getRepeat())};KJE.Default.COMPOUND_DAILY=0;KJE.Default.COMPOUND_MONTHLY=1;KJE.Default.COMPOUND_QRTLY=2;KJE.Default.COMPOUND_SEMI=3;KJE.Default.COMPOUND_ANNUALLY=4;KJE.Default.COMPOUND_INDEX=[KJE.Default.COMPOUND_DAILY,KJE.Default.COMPOUND_MONTHLY,KJE.Default.COMPOUND_QRTLY,KJE.Default.COMPOUND_SEMI,KJE.Default.COMPOUND_ANNUALLY];KJE.Default.COMPOUND_DESC=KJE.parameters.get("ARRAY_COMPOUND_DESC",["compound daily","compound monthly","compound quarterly","compound semi-annually","compound annually"]);KJE.Default.COMPOUND_SELECTIONS=KJE.parameters.get("ARRAY_COMPOUND_SELECTIONS",["Daily","Monthly","Quarterly","Semi-Annually","Annually"]);KJE.Default.COMPOUND_FREQ=[360,12,4,2,1];KJE.Default.SAVE_WEEKLY=0;KJE.Default.SAVE_BIWEEKLY=1;KJE.Default.SAVE_MONTHLY=2;KJE.Default.SAVE_QUARTERLY=3;KJE.Default.SAVE_YEARLY=4;KJE.Default.SAVE_INDEX=[KJE.Default.SAVE_WEEKLY,KJE.Default.SAVE_BIWEEKLY,KJE.Default.SAVE_MONTHLY,KJE.Default.SAVE_QUARTERLY,KJE.Default.SAVE_YEARLY];KJE.Default.SAVE_DESC=KJE.parameters.get("ARRAY_SAVE_DESC",["every week","every two weeks","per month","per quarter","per year"]);KJE.Default.SAVE_FREQ=[52,26,12,4,1];KJE.CalcName="Compare Savings Rates Calculator";KJE.CalcType="CompareSavings";KJE.parseInputs=function(b){var a=KJE.getDropBox("FREQ_INDEX",KJE.parameters.get("FREQ_INDEX",KJE.Default.SAVE_MONTHLY),KJE.Default.SAVE_INDEX,KJE.Default.SAVE_DESC);b=KJE.replace("**FREQ_INDEX**",a,b);a=KJE.getDropBox("COMPOUND_INDEX",KJE.parameters.get("COMPOUND_INDEX",KJE.Default.COMPOUND_ANNUALLY),KJE.Default.COMPOUND_INDEX,KJE.Default.COMPOUND_DESC);b=KJE.replace("**COMPOUND_INTEREST**",a,b);return b};KJE.initialize=function(){KJE.CalcControl=new KJE.CompareSavingsCalc();KJE.GuiControl=new KJE.CompareSavings(KJE.CalcControl)};KJE.CompareSavings=function(m){KJE.CalculatorTitleTemplate=KJE.parameters.get("TITLE_TEMPLATE",(m.bUseFees?"An annual fee of KJE5 produces a difference of KJE4.":"A rate of KJE2 earns KJE4 more than KJE1."));var e=KJE;var b=KJE.gLegend;var g=KJE.inputs.items;KJE.DollarSlider("STARTING_AMOUNT","Starting amount",0,10000000,0,0,2);KJE.DropBox("FREQ_INDEX","Contribution frequency");if(!m.SIMPLE){KJE.DropBox("COMPOUND_INDEX","Contribution frequency");KJE.NbrDropBox("ADDITIONAL_CONTRIBUTIONS","Additional contributions",0,1000000,0,e.FMT_DOLLARS,"DEPOSIT_INDEX")}else{KJE.DollarSlider("ADDITIONAL_CONTRIBUTIONS","Additional contributions",0,1000000,0,0,6)}KJE.NumberSlider("YEARS","Years",1,40,0);if(m.bUseFees){KJE.InvestRateSlider("ANNUAL_RATE","Annualized rate of return")}KJE.InputItem.AltHelpName="RATE_OF_RETURN";for(var j=0;j<m.COMPARE_COUNT;j++){KJE.InvestRateSlider("RATE_OF_RETURN"+(j+1),"Annual percentage yield "+(j+1))}KJE.InputItem.AltHelpName=null;KJE.Checkbox("PAYMENTS_AT_START","Make deposits",true,"At beginning of the period (uncheck for the end of the period)");this.GRAPH_LABEL_2=KJE.parameters.get("MSG_GRAPH_LABEL_2","Balance for RATE_OF_RETURN");var h=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_LABEL_1","Balance by Year"));h._legend._iOrientation=(b.TOP_RIGHT);h._showItemLabelOnTop=true;var a=KJE.parameters.get("MSG_DROPPER_TITLE",m.bUseFees?"Current investment plan:":"Current savings plan:");var c=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Starting amount KJE1, Additional contribution of KJE2 KJE3 for KJE4 years.");var d=function(){return a+KJE.subText(KJE.getKJEReplaced(c,g.STARTING_AMOUNT.getFormatted(),g.ADDITIONAL_CONTRIBUTIONS.getFormatted(),g.FREQ_INDEX.getFormatted(),g.YEARS.getFormatted()),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS",true,a,d),KJE.colorList[0]);var n=KJE.parameters.get("MSG_DROPPER2_TITLE",m.bUseFees?"Compare annual fees:":"Compare savings rates:");var f=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE",m.bUseFees?"Net return of KJE1 - KJE2 - KJE3":"KJE1 - KJE2 - KJE3");var k=function(){return n+KJE.subText(KJE.getKJEReplaced(f,e.percent(m.RATE_OF_RETURN[0]/100,3),e.percent(m.RATE_OF_RETURN[1]/100,3),e.percent(m.RATE_OF_RETURN[2]/100,3)),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS2",true,n,k),KJE.colorList[0])};KJE.CompareSavings.prototype.setValues=function(c){var a=KJE.inputs.items;c.PAYMENTS_AT_START=a.PAYMENTS_AT_START.getValue();c.FREQ_INDEX=a.FREQ_INDEX.getValue();if(!c.SIMPLE){c.COMPOUND_INDEX=a.COMPOUND_INDEX.getValue()}c.ADDITIONAL_CONTRIBUTIONS=a.ADDITIONAL_CONTRIBUTIONS.getValue();for(var b=0;b<c.COMPARE_COUNT;b++){if(c.bUseFees){c.RATE_OF_FEE[b]=a["RATE_OF_RETURN"+(b+1)].getValue()}else{c.RATE_OF_RETURN[b]=a["RATE_OF_RETURN"+(b+1)].getValue()}}if(c.bUseFees){c.ANNUAL_RATE=a.ANNUAL_RATE.getValue()}c.STARTING_AMOUNT=a.STARTING_AMOUNT.getValue();c.YEARS=a.YEARS.getValue()};KJE.CompareSavings.prototype.refresh=function(f){var e=KJE;var d=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];KJE.setTitleTemplate(e.percent(f.LOW_RATE,2),e.percent(f.HIGH_RATE,2),KJE.getTermLabel(f.YEARS*12,false),e.dollars(f.DIFFERENCE,2),e.percent(f.RATE_OF_FEE[f.HIGH_RATE_INT]/100,2),e.percent(f.RATE_OF_FEE[f.LOW_RATE_INT]/100,2));a.removeAll();a.setGraphCategories(f.cats);if(f.DR_BALANCE[0].length>2){a._showItemLabel=false}else{a._showItemLabel=true}for(var c=0;c<f.COMPARE_COUNT;c++){var g=KJE.replace("RATE_OF_RETURN",e.percent(f.RATE_OF_RETURN[c]/100,2),this.GRAPH_LABEL_2);a.add(new KJE.gGraphDataSeries(f.DR_BALANCE[c],g,a.getColor(c+1),null,g+" "+KJE.MSG_YEAR_LBL))}a.paint()};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-STARTING_AMOUNT'><input id='KJE-STARTING_AMOUNT' /></div> <div id='KJE-C-YEARS'><input id='KJE-YEARS' /></div> <div id='KJE-C-ADDITIONAL_CONTRIBUTIONS'><input id='KJE-ADDITIONAL_CONTRIBUTIONS' /></div> <div id='KJE-C-FREQ_INDEX'>**FREQ_INDEX**</div> <div class=KJEDropperSpacer></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-RATE_OF_RETURN1'><input id='KJE-RATE_OF_RETURN1' /></div> <div id='KJE-C-RATE_OF_RETURN2'><input id='KJE-RATE_OF_RETURN2' /></div> <div id='KJE-C-RATE_OF_RETURN3'><input id='KJE-RATE_OF_RETURN3' /></div> <div id='KJE-C-PAYMENTS_AT_START'><input id='KJE-PAYMENTS_AT_START' type=checkbox name='PAYMENTS_AT_START' /></div> <div class=KJEDropperSpacer></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-STARTING_AMOUNT' ><dt>Starting amount</dt><dd>The starting balance or current amount you have invested or saved. If you haven't started saving yet, set the amount to '$0'.</dd></div> <div id='KJE-D-YEARS' ><dt>Years</dt><dd>The total number of years you are planning to save or invest.</dd></div> <div id='KJE-D-ADDITIONAL_CONTRIBUTIONS' ><dt>Additional contributions</dt><dd>The amount that you plan on adding to your savings or investment regularly.</dd></div> <div id='KJE-D-FREQ_INDEX' ><dt>Contribution frequency</dt><dd>How often your additional contributions will occur. Your choices are weekly (52 times per year), every other week (26 times per year), monthly, quarterly or annually. </dd></div> <div id='KJE-D-RATE_OF_RETURN'><dt>Annual percentage yield (APY)</dt><dd>The annual rate of return for each savings account. **ROR_DEFINITION**</dd></div> <div id='KJE-D-PAYMENTS_AT_START' ><dt>Make deposits at beginning of the period</dt><dd>Check this box to have all additional contributions happen at the beginning of each period. Uncheck this box for the end of the period. Making contributions at the beginning of each period allows your money to begin earning a return immediately increasing your return. </dd></div> ";KJE.ReportText=' <!--HEADING "Compare Savings Rates" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>A rate of HIGH_RATE earns DIFFERENCE more over YEARS than LOW_RATE. </h2>Your total savings balance would be TOTAL_HIGH_AMOUNT if you save ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY for YEARS, making deposits at the PAYMENT_TYPE of each period. This includes a starting balance of STARTING_AMOUNT and a HIGH_RATE annual rate of return. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40" scope="col">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'>Rate 1</th><th class="KJEHeading KJECell20" scope=\'col\'>Rate 2</th><th class="KJEHeading KJECell20" scope=\'col\'>Rate 3</th></tr> </thead> <tbody class=\'KJEReportTBody\'> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Starting amount </th><td class="KJECell KJECellBorder" > STARTING_AMOUNT </td><td class="KJECell KJECellBorder" > STARTING_AMOUNT </td><td class="KJECell" > STARTING_AMOUNT </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Number of years to save </th><td class="KJECell KJECellBorder" >YEARS </td><td class="KJECell KJECellBorder" >YEARS </td><td class="KJECell" >YEARS </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Additional contributions </th><td class="KJECell KJECellBorder"> ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY, at the PAYMENT_TYPE of each period</td><td class="KJECell KJECellBorder"> ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY, at the PAYMENT_TYPE of each period </td><td class="KJECell"> ADDITIONAL_CONTRIBUTIONS DEPOSIT_FREQUENCY, at the PAYMENT_TYPE of each period </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual percentage yield (APY) </th><td class="KJECell KJECellBorder"> RATE_OF_RETURN1</td><td class="KJECell KJECellBorder"> RATE_OF_RETURN2</td><td class="KJECell"> RATE_OF_RETURN3</td></tr> </tbody> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total amount you will have contributed </th><td class="KJECellStrong KJECellBorder" > TOTAL_AMOUNT_YOU_HAVE_PAID_IN1 </td><td class="KJECellStrong KJECellBorder" > TOTAL_AMOUNT_YOU_HAVE_PAID_IN2 </td><td class="KJECellStrong" > TOTAL_AMOUNT_YOU_HAVE_PAID_IN3 </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total at end of investment </th><td class="KJECellStrong KJECellBorder" >TOTAL_AT_END_OF_INVESTMENT1</td><td class="KJECellStrong KJECellBorder" >TOTAL_AT_END_OF_INVESTMENT2</td><td class="KJECellStrong" >TOTAL_AT_END_OF_INVESTMENT3</td></tr> </tfoot> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Savings Balance by Year</h2> **REPEATING GROUP** ';
// 07/02/2023 Copyright 2023 KJE Computer Solutions, Inc.  Licensed for use on https://www.ConnexusCU.org

