import { Component, OnInit, ElementRef, Renderer2, ViewChildren, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api/api.service';

import * as moment from 'moment';
import 'moment-timezone';

import { HttpServiceHelper } from 'src/app/common/HttpServiceHelper';
import { DatatablesService } from 'src/app/datatables/datatables.service';
import { IfStmt } from '@angular/compiler';

import { Subject } from 'rxjs';


//import propdata from 'src/app/common/buildings.json';


@Component({
    selector: 'app-new-indication',
    templateUrl: './new-indication.component.html',
    styleUrls: ['./new-indication.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})

export class NewIndicationComponent implements OnInit, AfterViewInit {

    @ViewChild('fullpageRef') fp_directive: ElementRef;
    pageTitle = 'Indication';

    loadAPI: Promise<any>;


    dtTrigger: Subject<any> = new Subject();


    dtOptions: DataTables.Settings = {};
    userData: any;
    country = 'Singapore';
    isSingapore = true;
    selectedcurrency: string;
    exchangerate: number;
    loadingalldata = true;
    tablerendered = false;
    fromsearchindication = false;

    postalsuggestion: any;
    allproperties: any;
    property_id: any;
    propertydata: any = {};
    countrycodes: any;

    allprop: any[] = [];
    allpropcount: any;

    processsavedone = false;
    formaddpropertysubmitted = false;
    formaddindicationsubmitted = false;
    spinnershow = false;
    message: any;
    isupdateproperty = false;
    modalpropertytitle: string;
    questionmessage: string;
    cfmtitlemessage: string;
    isloading = false;
    btnaction: string;
    isdeleteproperty = false;
    disablenumofyears = false;
    showerroralert = false;
    saveindication = false;



    indicationdata: any = {};
    valuers: any;
    indicationdate: any;
    selectedvaluers: any;
    currency: any;
    currencies: any;
    selectedcurrencyunit: any;
    homecurrency = "SGD";
    keyword = 'POSTAL';

    // PROPERTY DETAILS
    propdetails: any = {};
    proptypes: any;
    selecttenure: string;
    selectnumofyears: any;
    selectproptype: any;
    selectpropcondition: any;
    selectagetop: any;
    floorareasqm: number = 0;
    landareasqft: number = 0;

    // CLIENT DETAILS
    clients: any;
    clientselected = false;
    filteredclients: any;
    companies: any;
    companyselected = false;
    companycategory = "--";
    companycode = "--";

    selectcompany: number;
    selectclient: any;
    clientdata: any = {};
    hcproposedfee: any;
    ocproposedfee: any;
    companydetails: any = {};
    company_cats: any;
    company_codes: any;
    saveCompanySubmitted = false;

    savecompany = false;
    saveclient = false;
    saveClientSubmitted = false;
    clientdetails: any = {};


    // PROPERTY VALUES

    indicationvaluevhpfrom: any;
    indicationvaluevhpto: any;
    indicationvaluevocfrom: any;
    indicationvaluevocto: any;
    purchasehc: any;
    askinghc: any;
    purchaseoc: any;
    askingoc: any;
    selectedoccupancy: any;
    propvalues: any = {};
    leaseexpirydate: any;
    leasecommencedate: any;
    occupancies: any;

    // SEARCH INDICATION

    // indicationfrmdate:any;
    // indicationtodate:any;

    searhindicationdetails: any = {};
    searchcompanyselected: any;
    searchclientselected: any;
    inidicationsearchresults: any[] = [];
    selectedsearchindication: any;
    filteredindication: any;
    searchinginprocess = false;
    showerroralertsearch = false;


    tnumyears = [];
    tnumyearh = [];
    comdays = [];
    commonth = [];
    comyear = [];
    comcedate: any = {};
    comcedateday: any;

    propconditions = [
        { name: "Good" },
        { name: "Average" },
        { name: "Below Average" }
    ];

    agetops = [];

    constructor(
        private dtService: DatatablesService,
        private httpService: HttpServiceHelper,
        config: NgbModalConfig,
        private modalService: NgbModal,
        private apiService: ApiService,
        private renderer: Renderer2

    ) {
        config.backdrop = 'static';
        config.keyboard = false;

    }



    ngOnInit() {

        this.comcedate = {};
        // this.loadScript();

        this.countrycodes = [
            { 'id': 0, 'code': 0 },
            { 'id': 3, 'code': 44 },
            { 'id': 1, 'code': 65 },
            { 'id': 2, 'code': 852 }
        ];

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            deferRender: true,
            retrieve: true,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {

                this.dtService.dtProperties(dataTablesParameters).
                    subscribe(response => {
                        this.allproperties = response.data;
                        console.log(dataTablesParameters);
                        console.log(response);
                        callback({
                            recordsTotal: response.recordsTotal,
                            recordsFiltered: response.recordsFiltered,
                            data: []
                        });
                    });
            },

            columns: [
                { data: 'name' },
                { data: 'block_num' },
                { data: 'unit_num' },
                { data: 'street_name' },
                { data: 'postal_code' },
                { data: 'old_postal_code' },
                { data: 'id' },
                { data: 'actions' }

            ]
        };



        this.httpService.currentUserData.subscribe(userdata =>
            this.userData = userdata['users']
        );

        this.indicationdate = moment().format('YYYY-MM-DD').toString();

        // this.leaseexpirydate =moment().format('YYYY-MM-DD').toString();
        // this.leasecommencedate=moment().format('YYYY-MM-DD').toString();

        this.leaseexpirydate = "";
        this.leasecommencedate = "";

        this.searhindicationdetails.indicationfrmdate = moment().format('YYYY-MM-DD').toString();
        this.searhindicationdetails.indicationtodate = moment().format('YYYY-MM-DD').toString();


        this.loadIndicationsReqData();
        //this.getCurrency();

        //console.log(propdata);

        //  this.postalsuggestion = propdata;

        //console.log(postalsuggestion);

        //this.selectnumofyears=this.tnumyears[0].name;

        this.selectpropcondition = this.propconditions[1].name;
        this.selectagetop = this.agetops[0].name;
        this.selecttenure = "Leasehold";
        this.allprop = [];
        this.fromsearchindication = false;

        //this.loadAPI = new Promise((resolve) => {
        // this.removescriptbeforeHTML();

        // this.removedupScript();
        // resolve(true);
        // });
        //  tnumyears=[
        //   {name:"99-1"},
        //   {name:"999-900"}
        // ];

        for (let _x = 1950; _x <= 2030; _x++) {

            this.agetops.push({ "name": _x });
        }

        for (let _i = 1; _i <= 99; _i++) {

            this.tnumyears.push({ "name": _i });
        }

        for (let _i = 900; _i <= 999; _i++) {

            this.tnumyearh.push({ "name": _i });
        }

        for (let _i = 1; _i <= 31; _i++) {

            this.comdays.push({ "name": _i });
        }

        for (let _i = 1; _i <= 12; _i++) {

            this.commonth.push({ "name": _i });
        }

        for (let _i = 1901; _i <= 2030; _i++) {

            this.comyear.push({ "name": _i });
        }

        this.comcedate.comday == "DD";
        this.comcedate.commonth == "MM";
        this.comcedate.commyear == "YY";
        //alert(this.comcedate.comday);
        //tnumyearh
        //console.log(this.tnumyears);

    }

    ngAfterViewInit(): void {

        //  this.dtTrigger.next();
    }

    onTenureChange(event: any) {
        this.selecttenure = event.target.value;

        if (this.selecttenure == "Freehold") {
            this.disablenumofyears = true;
            this.selectnumofyears = "--";

        } else {
            this.disablenumofyears = false;
            //this.selectnumofyears = this.tnumyears[0].name;
        }
    }

    onCompanyChange(event: any) {

        this.clientdata = {};
        this.clientdata['clientphone'] = "";
        this.selectcompany = event.target.value;

        if (this.selectcompany !== 0) {

            this.companyselected = true;
            this.clientselected = false;
            this.formaddindicationsubmitted = true;
            this.companies.forEach((element, index) => {

                if (event.target.value == element.id) {
                    this.companycategory = this.companies[index].cat_display_text;
                    this.companycode = this.companies[index].code_display_text;
                }

            });

            this.selectclient = 0;

            let um = Number(this.selectcompany);

            this.filteredclients = this.clients.filter(

                clients =>

                    clients.company_id === um
            );

            if (this.filteredclients.length <= 0) {
                this.companyselected = false;
            } else {
                this.companyselected = true;
            }
            console.log(this.filteredclients);



        } else {
            this.companyselected = false;
            this.companycategory = "--";
            this.companycode = "--";
        }



    }

    onCompanySearchChange(event: any) {

        this.clientdata = {};
        this.clientdata['clientphone'] = "";
        this.searhindicationdetails.company_id = event.target.value;

        if (this.searhindicationdetails.company_id !== '0') {

            this.searchcompanyselected = true;
            this.searchclientselected = false;

            this.searhindicationdetails.company_client_id = 0;

            let um = Number(this.searhindicationdetails.company_id);

            this.filteredclients = this.clients.filter(

                clients =>

                    clients.company_id === um
            );

            if (this.filteredclients.length <= 0) {
                this.searchcompanyselected = false;
            } else {
                this.searchcompanyselected = true;
            }
            console.log(this.filteredclients);



        } else {

            this.searchcompanyselected = false;
            this.searhindicationdetails.company_client_id = 0;

        }


    }

    onCompanyChangeSearch(id) {

        this.clientdata = {};
        this.clientdata['clientphone'] = "";
        this.selectcompany = id;

        if (this.selectcompany !== 0) {

            this.companyselected = true;
            this.clientselected = false;
            this.formaddindicationsubmitted = true;
            this.companies.forEach((element, index) => {

                if (id == element.id) {
                    this.companycategory = this.companies[index].cat_display_text;
                    this.companycode = this.companies[index].code_display_text;
                }

            });

            // this.selectclient=0;

            let um = Number(this.selectcompany);

            this.filteredclients = this.clients.filter(

                clients =>

                    clients.company_id === um
            );

        } else {
            this.companyselected = false;
            this.companycategory = "--";
            this.companycode = "--";
        }



    }

    onClientChangeSearch(id) {


        this.clientselected = true;
        this.formaddindicationsubmitted = true;
        this.filteredclients.forEach((element, index) => {

            if (id == element.id) {
                this.clientdata = this.filteredclients[index];
            }

        });

        this.clientdata['clientphone'] = "+" + this.clientdata["phone_1_country_code"] + " " + this.clientdata["phone_1_number"];



        console.log(this.clientdata);
    }

    processSearchIndications() {



        this.searchinginprocess = true;

        console.log(this.searhindicationdetails);
        var queries = [];


        for (let [key, value] of Object.entries(this.searhindicationdetails)) {


            if (key == 'indicationfrmdate') {
                //     query = "indication_created_at_datetime >='"+value +" 00:00:00'";
                //     queries.push(query);
            } else if (key == 'indicationtodate') {
                //   query = "indication_created_at_datetime <='" +value +" 23:59:59'";
                //   queries.push(query);
            } else {
                //if(key!= 'indicationfrmdate' || key !='indicationtodate'){

                if (value != "") {
                    queries.push(key + " like '%" + value + "%'");
                }


            }


        }
        let dateq = "indication_created_at_datetime >='" + this.searhindicationdetails.indicationfrmdate + " 00:00:00' AND indication_created_at_datetime <='" + this.searhindicationdetails.indicationtodate + " 23:59:59'";

        //queries.push(dateq);

        console.log(queries.length);

        var querystring;

        if (queries.length <= 0) {
            querystring = dateq
        } else {
            querystring = queries.join(" OR ");
            querystring = querystring + " AND " + dateq;
        }

        var datastring = {
            "querystring": querystring
        }

        //console.log(this.searhindicationdetails.length());

        this.apiService.searchIndication(datastring).subscribe(
            (response) => {
                console.log(response.subj);

                if (response.subj.status == 'success') {

                    this.inidicationsearchresults = response.subj.indications
                } else {
                    this.message = 'Search failed!';
                }

                this.searchinginprocess = false;
            },
            (err) => {
                console.log(err);
            }

        );
    }

    searchIndicationRadio(event, id) {
        // alert(id);
        this.showerroralertsearch = false;
        this.selectedsearchindication = id;

        this.filteredindication = this.inidicationsearchresults.filter(

            selindication =>

                selindication.id === id
        );

        console.log(this.filteredindication[0]);

    }

    populateIndication() {


        if (!this.selectedsearchindication) {
            this.showerroralertsearch = true;
        } else {
            this.showerroralertsearch = false;
            let searchprop = {
                'id': this.filteredindication[0].indication_property_id,
                'postal_code': this.filteredindication[0].indication_postal,
                'old_postal_code': this.filteredindication[0].indication_postal_old,
                'name': this.filteredindication[0].indication_proptitle,
                'block_num': this.filteredindication[0].indication_hsenum,
                'street_name': this.filteredindication[0].indication_stname,
                'unit_num': this.filteredindication[0].indication_unitnum,
                'floor_num': this.filteredindication[0].indication_floor_num,
                'created_at_unix_time': moment().unix(),
                'created_at_tz': moment.tz.guess(),
                'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
                'created_at_by_user_id': this.userData[0].id,
                'created_by_user_type': this.userData[0].role_display_name,
                'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')

            };
            if (this.allprop.length >= 1) {
                this.allprop = [];
                this.fromsearchindication = false;
                // this.showerroralert=false;
            }

            this.allprop.push(searchprop);
            this.fromsearchindication = true;
            this.showerroralert = false;
            console.log(this.allprop);
            this.allpropcount = this.allprop.length;

            // PROPERTY DETAILS
            this.selecttenure = this.filteredindication[0].indication_tenure;
            this.selectnumofyears = this.filteredindication[0].indication_propage;
            this.selectproptype = this.filteredindication[0].indication_propdetail_property_type_id;
            this.selectnumofyears = this.filteredindication[0].indication_num_of_years;
            this.propdetails.lotnum = this.filteredindication[0].indication_lotnum;
            this.propdetails.mkts = this.filteredindication[0].indication_mk_ts;
            this.selectpropcondition = this.filteredindication[0].indication_condition;
            this.selectagetop = this.filteredindication[0].indication_propage;
            this.propdetails.landareasqm = this.filteredindication[0].indication_landarea_sqm;
            this.propdetails.landareasqft = this.filteredindication[0].indication_landarea_sqft;
            this.propdetails.floorareasqm = this.filteredindication[0].indication_flrarea_sqm;
            this.propdetails.floorareasqft = this.filteredindication[0].indication_flrarea_sqft;
            this.propdetails.propremarks = this.filteredindication[0].indication_note;

            //Client Details
            this.selectcompany = this.filteredindication[0].company_id;
            this.selectclient = this.filteredindication[0].company_client_id;

            this.onCompanyChangeSearch(this.selectcompany);
            this.onClientChangeSearch(this.selectclient);
            // this.clientdata.email=this.filteredindication[0].company_client_email;
            //this.clientdata.clientphone= "+" + this.filteredindication[0].company_client_email;
            this.hcproposedfee = this.filteredindication[0].indication_proposed_fee_hc;
            this.ocproposedfee = this.filteredindication[0].indication_proposed_fee_oc;

            //Property Values

            this.indicationvaluevhpfrom = this.filteredindication[0].indication_indication_value_frm_hc;
            this.indicationvaluevhpto = this.filteredindication[0].indication_indication_value_to_hc;

            this.indicationvaluevocfrom = this.filteredindication[0].indication_indication_value_frm_oc;
            this.indicationvaluevocto = this.filteredindication[0].indication_indication_value_to_oc;

            this.purchasehc = this.filteredindication[0].indication_purchase_hc;
            this.askinghc = this.filteredindication[0].indication_asking_hc;

            this.purchaseoc = this.filteredindication[0].indication_purchase_oc;
            this.askingoc = this.filteredindication[0].indication_asking_oc;
            this.selectedoccupancy = this.filteredindication[0].indication_propvalue_occupancy_id;
            this.propvalues.landratepsm = this.filteredindication[0].indication_landrate_psm;
            this.propvalues.landratepsf = this.filteredindication[0].indication_landrate_psf;
            this.propvalues.rentalamount = this.filteredindication[0].indication_rental_amt;
            this.propvalues.rentalrate = this.filteredindication[0].indication_rental_amt_psf;
            this.propvalues.floorratepsm = this.filteredindication[0].indication_flrrate_psm;
            this.propvalues.floorratepsf = this.filteredindication[0].indication_flrrate_psf;
            this.leasecommencedate = moment(this.filteredindication[0].indication_lease_commence).format('YYYY-MM-DD').toString();
            this.leaseexpirydate = moment(this.filteredindication[0].indication_lease_expiry).format('YYYY-MM-DD').toString();


            //this.fromsearchindication=false;
            this.modalService.dismissAll();


        }



    }

    clearFields() {
        // PROPERTY DETAILS
        this.allprop = [];
        this.selecttenure = "Leashold";

        this.selecttenure = "Leasehold";
        this.selectnumofyears = '99-1';
        this.selectproptype = 1;
        this.selectpropcondition = "Average";
        this.selectagetop = "1951 - (+20 years from now?";
        this.disablenumofyears = true;
        this.propdetails = {};

        //Client Details
        this.selectcompany = 0;
        this.selectclient = 0;

        this.onCompanyChangeSearch(this.selectcompany);
        this.onClientChangeSearch(this.selectclient);
        this.clientselected = false;
        this.clientselected = false;
        this.clientdata.email = "";
        this.clientdata.clientphone = "";
        this.hcproposedfee = "";
        this.ocproposedfee = "";

        //Property Values

        this.indicationvaluevhpfrom = "";
        this.indicationvaluevhpto = "";

        this.indicationvaluevocfrom = "";
        this.indicationvaluevocto = "";

        this.purchasehc = "";
        this.askinghc = "";

        this.purchaseoc = "";
        this.askingoc = "";
        this.selectedoccupancy = 0;
        this.propvalues = {};

        //  this.leasecommencedate = moment().format('YYYY-MM-DD').toString();
        //  this.leaseexpirydate = moment().format('YYYY-MM-DD').toString();
        this.leasecommencedate = "";
        this.leaseexpirydate = "";

    }

    onClientChange(event: any) {

        if (event.target.value === "0") {

            this.clientselected = false;
            // this.formaddindicationsubmitted=false;
            this.clientdata = {};
            this.clientdata['clientphone'] = "";

        } else {
            this.clientselected = true;
            this.formaddindicationsubmitted = true;
            this.filteredclients.forEach((element, index) => {

                if (event.target.value == element.id) {
                    this.clientdata = this.filteredclients[index];
                }

            });

            this.clientdata['clientphone'] = "+" + this.clientdata["phone_1_country_code"] + " " + this.clientdata["phone_1_number"];
        }


        console.log(this.clientdata);
    }

    onHCPFChange(event: any) {
        let cur = event.target.value * this.exchangerate;
        this.ocproposedfee = cur.toFixed(2);

    }

    onOCPFChange(event: any) {
        let cur = event.target.value / this.exchangerate;
        this.hcproposedfee = cur.toFixed(2);



    }

    onHCIVFromChange(event: any) {
        // let cur=event.target.value * this.exchangerate;
        //this.indicationvaluevocfrom = cur.toFixed(2);
        let lrcursqm = event.target.value / this.propdetails.landareasqm;
        this.propvalues.landratepsm = lrcursqm.toFixed(2);

        let lrcursqft = event.target.value / this.propdetails.landareasqft;
        this.propvalues.landratepsf = lrcursqft.toFixed(2);

        let frpsm = event.target.value / this.propdetails.floorareasqm;
        this.propvalues.floorratepsm = frpsm.toFixed(2);

        let frpsqft = event.target.value / this.propdetails.floorareasqft;
        this.propvalues.floorratepsf = frpsqft.toFixed(2);
    }

    onOCIVFromChange(event: any) {
        let cur = event.target.value / this.exchangerate;
        this.indicationvaluevhpfrom = cur.toFixed(2);
    }

    onOCIVCTohange(event: any) {
        let cur = event.target.value * this.exchangerate;
        this.indicationvaluevocto = cur.toFixed(2);
    }

    onOCIVToChange(event: any) {
        let cur = event.target.value / this.exchangerate;
        this.indicationvaluevhpto = cur.toFixed(2);
    }

    onPurchaseHCChange(event: any) {
        let cur = event.target.value * this.exchangerate;
        this.purchaseoc = cur.toFixed(2);

    }

    onPurchaseOCChange(event: any) {
        let cur = event.target.value / this.exchangerate;
        this.purchasehc = cur.toFixed(2);
    }

    onAskingHCChange(event: any) {
        let cur = event.target.value * this.exchangerate;
        this.askingoc = cur.toFixed(2);
    }

    onAskingOCChange(event: any) {
        let cur = event.target.value / this.exchangerate;
        this.askinghc = cur.toFixed(2);
    }
    rentalAmountChange(event: any) {
        let cur = event.target.value / this.propdetails.floorareasqft;
        this.propvalues.rentalrate = cur.toFixed(2);
    }

    convertToSqmt(event: any, field) {
        console.log(event.target.value);
        let numsft = event.target.value / 10.764;
        if (field == 'landarea') {
            this.propdetails.landareasqm = numsft.toFixed(2);
        } else {
            this.propdetails.floorareasqm = numsft.toFixed(2);
        }



    }

    convertToSqft(event: any, field) {
        console.log(event.target.value);
        let numsqm = event.target.value * 10.764;


        if (field == 'landarea') {
            this.propdetails.landareasqft = numsqm.toFixed(2);
        } else {
            this.propdetails.floorareasqft = numsqm.toFixed(2);
        }

    }

    getCurrency() {

        this.apiService.getCurrency(this.homecurrency).subscribe(
            (response) => {
                console.log(response);
                this.currency = response.rates;
                var currencynew = Object.keys(this.currency)[29];
                this.selectedcurrency = Object.keys(this.currency)[29];

                this.exchangerate = this.currency[currencynew].toFixed(2);

                this.ocproposedfee = this.hcproposedfee * this.exchangerate;

                this.indicationvaluevocfrom = this.indicationvaluevhpfrom * this.exchangerate;
                this.indicationvaluevocto = this.indicationvaluevhpto * this.exchangerate;


                this.purchaseoc = this.purchasehc * this.exchangerate;
                this.askingoc = this.askinghc * this.exchangerate;
                //console.log(this.currency);
                //console.log(Object.keys(this.currency)[29]);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    currencyChange(currencyselected) {

        let newcuur: any;

        this.currencies.forEach((element, index) => {

            if (currencyselected == element.id) {

                newcuur = this.currencies[index].exchange_rate;
                this.selectedcurrencyunit = this.currencies[index].unit;
            }

        });

        this.exchangerate = newcuur;


        //this.exchangerate=this.currency[currencyselected].toFixed(2);

        this.hcproposedfee = this.hcproposedfee / this.exchangerate;

        this.ocproposedfee = this.hcproposedfee * this.exchangerate;
        this.indicationvaluevocfrom = this.indicationvaluevhpfrom * this.exchangerate;
        this.indicationvaluevocto = this.indicationvaluevhpto * this.exchangerate;


        this.purchaseoc = this.purchasehc * this.exchangerate;
        this.askingoc = this.askinghc * this.exchangerate;

    }

    loadIndicationsReqData() {

        const data = {
            'role_id': 3
        };

        this.apiService.getIndicationsReqData(data).subscribe(
            (response) => {
                console.log(response);
                if (response.status == 'success') {
                    this.valuers = response.valuers;
                    this.proptypes = response.property_types;
                    this.companies = response.companies;
                    this.clients = response.clients;
                    this.currencies = response.currencies;
                    this.occupancies = response.occupancies;
                    this.company_cats = response.company_cat;
                    this.company_codes = response.company_code;

                    this.selectedvaluers = response.valuers[0].id;

                    this.selectproptype = this.proptypes[0].id;
                    this.selectcompany = 0;
                    this.selectclient = 0;

                    this.selectedcurrency = this.currencies[0].id;
                    this.selectedcurrencyunit = this.currencies[0].unit;

                    this.exchangerate = this.currencies[0].exchange_rate;
                    this.selectedoccupancy = 0;


                }

                this.loadingalldata = false;

                this.loadScript();

            },
            (err) => {
                console.log(err);
            }
        );

    }

    openXL(content: any, modalselected) {

        this.modalService.open(content, { size: 'xl' });
    }

    openSearchIndications(content: any) {
        this.inidicationsearchresults = [];
        this.searhindicationdetails.company_id = 0;
        this.searhindicationdetails.company_client_id = 0;
        this.searchcompanyselected = false;

        this.modalService.open(content, { size: 'xl' });
    }

    openCreatePropertyModal(content, mods) {
        console.log('OPEN CREATE');
        this.formaddpropertysubmitted = false;

        this.isupdateproperty = false;
        this.isdeleteproperty = false;
        this.saveindication = false;
        this.modalpropertytitle = "Create Property"
        this.propertydata = {};

        // OPEN CREATE FORM MODAL //modalproperty
        this.modalService.open(content);
    }

    // PROPERTY CREATE BUTTON CLICKED 
    openPropertyModalConfirm(content: any, fromform: string) {
        console.log(' CREATE CLICKED');
        this.processsavedone = false;

        if (fromform == "propertyaddress") {

            this.formaddpropertysubmitted = true;
            this.formaddindicationsubmitted = false;

            // CHECK IF FORM HAS ERROR BEFORE OPENNING THE CONFIRMATION MODAL
            setTimeout(() => {



                if (document.querySelectorAll('.is-invalid').length <= 0) {

                    // OPEN SMALL CONFIRMATION MODAL
                    this.confirmedPropertyNoError(content);
                }
            }
                , 100);

        }


    }

    confirmedPropertyNoError(content) {

        this.saveindication = false;

        if (this.isupdateproperty) {
            this.cfmtitlemessage = "Confirm Update Property"
            this.questionmessage = "Confirm update.";
        } else {
            this.cfmtitlemessage = "Confirm Add Property"
            this.questionmessage = "Are you sure you want add property?";
        }

        // THIS WILL OPEN THE FINAL MODAL TO UPDATE OR CREATE PROPERTY
        //#modalconfirm
        this.modalService.open(content, { size: 'sm' });

    }


    openUpdateModal(content: any, updatedetails) {

        this.isloading = true;

        if (updatedetails.modal == "updateproperty") {

            this.isupdateproperty = true;
            this.isdeleteproperty = false;
            this.modalpropertytitle = "Update Property";
            this.propertydata = updatedetails.newprop;
            this.isloading = false;

            console.log(this.propertydata);
            /*
            console.log(updatedetails);
            this.property_id=updatedetails.id;
      
            const data = {
              'property_id': updatedetails.id
            };
        
            this.apiService.getProperty(data).subscribe(
              (response) => {
                  console.log(response);
                  if(response.status=='success'){
                    this.propertydata=response.property[0];
                    this.isloading=false;
                  }
        
                
              },
              (err) => {
                  console.log(err);
              }
            );
      
            */

        }
        // OPEN CREATE FORM MODAL //modalproperty
        this.modalService.open(content);
    }

    openIndicationAddCompany(content: any) {

        this.companydetails = {};
        this.savecompany = false;
        this.saveCompanySubmitted = false;

        this.companydetails.company_category_id = 0;
        this.companydetails.company_code_id = 0;
        this.companydetails.phone_country_code = 65;
        this.companydetails.fax_country_code = 65;
        // OPEN FORM #addcompanyinidcation



        this.modalService.open(content, { size: 'xl' });

    }

    openConfirmAddCompany(content: any) {

        this.saveCompanySubmitted = true;
        this.isdeleteproperty = false;
        this.isupdateproperty = false;
        this.saveindication = false;
        this.saveclient = false;

        // CHECK IF FORM HAS ERROR BEFORE OPENNING THE CONFIRMATION MODAL
        var container = document.querySelector("#addcindication");

        setTimeout(() => {

            if (container.querySelectorAll('.is-invalid').length <= 0) {

                this.savecompany = true;
                this.cfmtitlemessage = "Confirm Add Company";

                this.questionmessage = "Are you sure you want to add Company?"


                this.modalService.open(content, { size: 'sm' });
            }
        }
            , 100);


    }
    openIndicationAddClient(content: any) {
        this.clientdetails = {};
        this.savecompany = false;
        this.saveCompanySubmitted = false;
        this.saveclient = false;
        this.saveClientSubmitted = false;
        this.clientdetails.company_id = 0;

        this.clientdetails.phone_2_country_code = 65;
        this.clientdetails.phone_1_country_code = 65;


        this.modalService.open(content, { size: 'xl' });
    }
    openConfirmAddClient(content: any) {

        this.saveClientSubmitted = true;
        this.isdeleteproperty = false;
        this.isupdateproperty = false;
        this.saveindication = false;
        this.savecompany = false;

        // CHECK IF FORM HAS ERROR BEFORE OPENNING THE CONFIRMATION MODAL
        var container = document.querySelector("#addclientindication");

        setTimeout(() => {

            if (container.querySelectorAll('.is-invalid').length <= 0) {

                this.saveclient = true;

                this.cfmtitlemessage = "Confirm Add Client";

                this.questionmessage = "Are you sure you want to add Client?"


                this.modalService.open(content, { size: 'sm' });
            }
        }
            , 100);
    }

    openIndicationConfirmation(content: any) {
        this.formaddpropertysubmitted = false;
        this.formaddindicationsubmitted = true;

        setTimeout(() => {

            if (document.querySelectorAll('.is-invalid').length <= 0 && this.allprop.length > 0) {
                this.showerroralert = false;

                this.saveIndication(content);

            } else {

                if (this.allprop.length <= 0) {
                    this.scrollToError('section2');
                } else {
                    this.scrollToError('section4');
                }


                this.showerroralert = true;
            }
        }
            , 100);
    }


    openConfirmDelete(content, id) {
        //openConfirmDelete
        //this.property_id=id;

        this.isdeleteproperty = true;
        this.isupdateproperty = false;
        this.saveindication = false;
        this.cfmtitlemessage = "Confirm Delete Property"
        this.questionmessage = "Are you sure you want to delete Property [" + id + "]?";

        this.modalService.open(content, { size: 'sm' });
    }

    confirmSaveData() {

        this.processsavedone = false;
        this.spinnershow = true;

        if (this.saveindication) {

            var savedata = {
                "inddate": this.indicationdate,
                "valuer_user_id": this.selectedvaluers,
                "other_currency_id": this.selectedcurrency,

                // PROP DETAILS
                "tenure": this.selecttenure,
                "propdetail_property_type_id": this.selectproptype,
                "lotnum": !this.propdetails.lotnum ? "" : this.propdetails.lotnum,
                "mk_ts": !this.propdetails.mkts ? "" : this.propdetails.mkts,
                "condition": this.selectpropcondition,
                "num_of_years": !this.selectnumofyears ? 0 : this.selectnumofyears,
                "propage": !this.selectnumofyears ? 0 : this.selectagetop,
                "landarea_sqm": !this.propdetails.landareasqm ? 0 : this.propdetails.landareasqm,
                "landarea_sqft": !this.propdetails.landareasqft ? 0 : this.propdetails.landareasqft,
                "flrarea_sqm": !this.propdetails.floorareasqm ? 0 : this.propdetails.floorareasqm,
                "flrarea_sqft": !this.propdetails.floorareasqft ? 0 : this.propdetails.floorareasqft,
                "note": !this.propdetails.propremarks ? "" : this.propdetails.propremarks,

                // CLIENT DETAILS

                "clientdetail_company_id": this.selectcompany,
                "clientdetail_client_id": this.selectclient,
                "proposed_fee_oc": !this.ocproposedfee ? 0 : this.ocproposedfee,
                "proposed_fee_hc": !this.hcproposedfee ? 0 : this.hcproposedfee,


                // PROPERTY VALUES


                "indication_value_frm_hc": !this.indicationvaluevhpfrom ? 0 : this.indicationvaluevhpfrom,
                "indication_value_to_hc": !this.indicationvaluevhpto ? 0 : this.indicationvaluevhpto,
                "indication_value_frm_oc": !this.indicationvaluevocfrom ? 0 : this.indicationvaluevocfrom,
                "indication_value_to_oc": !this.indicationvaluevocto ? 0 : this.indicationvaluevocto,
                "propvalue_occupancy_id": this.selectedoccupancy,

                "purchase_hc": !this.purchasehc ? 0 : this.purchasehc,
                "purchase_oc": !this.purchaseoc ? 0 : this.purchaseoc,
                "asking_hc": !this.askinghc ? 0 : this.askinghc,
                "asking_oc": !this.askingoc ? 0 : this.askingoc,

                "landrate_psm": !this.propvalues.landratepsm ? 0 : this.propvalues.landratepsm,
                "landrate_psf": !this.propvalues.landratepsf ? 0 : this.propvalues.landratepsf,
                "rental_amt": !this.propvalues.rentalamount ? 0 : this.propvalues.rentalamount,
                "rental_amt_psf": !this.propvalues.rentalrate ? 0 : this.propvalues.rentalrate,
                "flrrate_psm": !this.propvalues.floorratepsm ? 0 : this.propvalues.floorratepsm,
                "flrrate_psf": !this.propvalues.floorratepsf ? 0 : this.propvalues.floorratepsf,
                "lease_commence": this.leasecommencedate,
                "lease_expiry": this.leaseexpirydate,

                // END 
                // PROPERTY
                "postal_old": !this.allprop[0].old_postal_code ? 0 : this.allprop[0].old_postal_code,
                "postal": this.allprop[0].postal_code,
                "unitnum": this.allprop[0].unit_num,
                "proptitle": this.allprop[0].name,
                "floor_num": this.allprop[0].floor_num,
                "stname": this.allprop[0].street_name,
                "hsenum": this.allprop[0].block_num,

                "lotnum_old": this.selectedoccupancy,
                "projname": this.selectedoccupancy,
                "proptype": this.selectedoccupancy,
                "renovated": this.selectedoccupancy,

                "lastsaved": moment().format('YYYY-MM-DD HH:mm:ss'),
                "firstsaved": moment().format('YYYY-MM-DD HH:mm:ss'),
                "created_at_datetime": moment().format('YYYY-MM-DD HH:mm:ss'),
                "updated_at_datetime": moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss'),

            }

            console.log(savedata);

            this.apiService.createIndication(savedata).subscribe(
                (response) => {
                    console.log(response);

                    if (response.status == 'success') {
                        console.log('INDICATION SAVED');
                        //  this.message = response.message;
                        //  this.processsavedone=true; 
                        //$('#myTable').DataTable().clear().draw();

                        // SAVE PROPERTY

                        this.saveProperty(response.inserted_id);

                    } else {
                        this.message = 'Create failed!';
                    }

                    //this.spinnershow = false;
                },
                (err) => {
                    console.log(err);
                }

            );




        } else {

            if (!this.isupdateproperty) {

                if (this.isdeleteproperty) {
                    // DELETE PROPERTY
                    //this.dtTrigger.unsubscribe();
                    this.allprop = [];
                    this.fromsearchindication = false;
                    this.tablerendered = true;
                    $('#myTable').DataTable().destroy();

                    this.dtTrigger.next();

                    this.message = "Successfully deleted";
                    this.spinnershow = false;
                    this.processsavedone = true;
                    this.allpropcount = this.allprop.length;
                    this.isdeleteproperty = false;
                    this.isupdateproperty = false;
                    this.saveindication = false;

                    /*
                      this.apiService.deleteProperty(this.property_id).subscribe(
                        (response) => {
                            console.log(response);
           
                              if(response.status=="success"){
           
                                $('#myTable').DataTable().clear().draw();
           
                                this.message=response.message;
                                this.spinnershow = false;
                                this.processsavedone=true; 
                              }
           
                        },
                        (err) => {
                            console.log(err);
                        }
           
                      );
                      */


                } else if (this.savecompany) {

                    this.companydetails.created_at_datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                    this.companydetails.updated_at_datetime = moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss');
                    this.companydetails.created_at_unix_time = moment().unix();
                    this.companydetails.created_at_tz = moment.tz.guess();
                    this.companydetails.created_at_tz = moment.tz.guess();
                    this.companydetails.created_at_by_user_id = this.userData[0].id;
                    this.companydetails.created_by_user_type = this.userData[0].role_display_name;
                    this.companydetails.country = this.country;


                    // console.log(this.companydetails);

                    this.apiService.createCompany(this.companydetails).subscribe(
                        (response) => {
                            console.log(response);

                            if (response.status == 'success') {
                                // console.log('COMPANY SAVED');
                                this.selectcompany = 0;
                                this.selectclient = 0;
                                this.message = response.message;
                                this.companies = response.companies;
                                this.clients = response.clients;
                                this.processsavedone = true;
                                //$('#myTable').DataTable().clear().draw();
                                // SAVE PROPERTY


                            } else {
                                this.message = 'Create failed!';
                            }

                            this.spinnershow = false;
                        },
                        (err) => {
                            console.log(err);
                        }

                    );


                } else if (this.saveclient) {


                    this.clientdetails.created_at_datetime = moment().format('YYYY-MM-DD HH:mm:ss');
                    this.clientdetails.updated_at_datetime = moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss');
                    this.clientdetails.created_at_unix_time = moment().unix();
                    this.clientdetails.created_at_tz = moment.tz.guess();
                    this.clientdetails.created_at_tz = moment.tz.guess();
                    this.clientdetails.created_at_by_user_id = this.userData[0].id;
                    this.clientdetails.created_by_user_type = this.userData[0].role_display_name;

                    console.log(this.clientdetails);

                    this.apiService.createClient(this.clientdetails).subscribe(
                        (response) => {
                            console.log(response);

                            if (response.status == 'success') {
                                console.log('COMPANY SAVED');
                                this.selectcompany = 0;
                                this.selectclient = 0;
                                this.message = response.message;
                                this.clients = response.clients;
                                this.companies = response.companies;
                                this.processsavedone = true;
                                //$('#myTable').DataTable().clear().draw();
                                // SAVE PROPERTY
                                this.saveclient = false;


                            } else {
                                this.message = 'Create failed!';
                            }

                            this.spinnershow = false;
                        },
                        (err) => {
                            console.log(err);
                        }

                    );

                } else {

                    // SAVE PROPERTY


                    let saveData = {
                        'id': '--',
                        'postal_code': this.propertydata.postal_code,
                        'old_postal_code': this.propertydata.old_postal_code,
                        'name': this.propertydata.name,
                        'block_num': this.propertydata.block_num,
                        'street_name': this.propertydata.street_name,
                        'unit_num': this.propertydata.unit_num,
                        'floor_num': this.propertydata.floor_num,
                        'created_at_unix_time': moment().unix(),
                        'created_at_tz': moment.tz.guess(),
                        'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
                        'created_at_by_user_id': this.userData[0].id,
                        'created_by_user_type': this.userData[0].role_display_name,
                        'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')

                    };
                    this.allprop.push(saveData);
                    // $('#myTable').DataTable().destroy();

                    $('#myTable').DataTable().destroy();
                    //$('#myTable').DataTable().clear().draw();
                    this.tablerendered = true;

                    this.dtTrigger.next();



                    //this.rerender();



                    this.allpropcount = this.allprop.length;

                    this.spinnershow = false;
                    this.processsavedone = true;
                    this.message = "Successfully saved."
                    this.isdeleteproperty = false;
                    this.isupdateproperty = false;
                    console.log(this.allprop);
                    /*
                   let saveData = {
                     'postal_code': this.propertydata.postal_code,
                     'old_postal_code': this.propertydata.old_postal_code,
                     'name': this.propertydata.name,
                     'block_num': this.propertydata.block_num,
                     'street_name': this.propertydata.street_name,
                     'unit_num': this.propertydata.unit_num,
                     'created_at_unix_time': moment().unix(),
                     'created_at_tz': moment.tz.guess(),
                     'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
                     'created_at_by_user_id':this.userData[0].id,
                     'created_by_user_type': this.userData[0].role_display_name,
                     'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')
         
                   };
                   */

                    /*
                    this.apiService.createProperty(saveData).subscribe(
                      (response) => {
                          console.log(response);
          
                            if(response.status=="success"){
          
                              $('#myTable').DataTable().clear().draw();
          
                              this.message=response.message;
                              this.spinnershow = false;
                              this.processsavedone=true; 
                            }
          
                      },
                      (err) => {
                          console.log(err);
                      }
          
                    );
          
                    */

                }

            } else {

                // UPDATE PROPERTY

                let saveData = {
                    'id': '--',
                    'postal_code': this.propertydata.postal_code,
                    'old_postal_code': this.propertydata.old_postal_code,
                    'name': this.propertydata.name,
                    'block_num': this.propertydata.block_num,
                    'street_name': this.propertydata.street_name,
                    'unit_num': this.propertydata.unit_num,
                    'floor_num': this.propertydata.floor_num,
                    'created_at_unix_time': moment().unix(),
                    'created_at_tz': moment.tz.guess(),
                    'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
                    'created_at_by_user_id': this.userData[0].id,
                    'created_by_user_type': this.userData[0].role_display_name,
                    'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')

                };
                this.allprop = [];
                this.allprop.push(saveData);
                this.fromsearchindication = false;
                this.dtTrigger.next();
                //$('#myTable').DataTable().destroy();
                this.tablerendered = true;
                this.allpropcount = this.allprop.length;
                this.message = "Successfully updated.";
                this.processsavedone = true;
                this.spinnershow = false;
                this.isdeleteproperty = false;
                this.isupdateproperty = false;
                this.saveindication = false;

                /*
              let updateData = {
                'property_id': this.property_id,
                'postal_code': this.propertydata.postal_code,
                'old_postal_code': (this.propertydata.old_postal_code==""?0 :this.propertydata.old_postal_code),
                'name': this.propertydata.name,
                'block_num': this.propertydata.block_num,
                'street_name': this.propertydata.street_name,
                'unit_num': this.propertydata.unit_num,
                'updated_at_unix_time': moment().unix(),
                'updated_at_tz': moment.tz.guess(),
                'updated_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
                'updated_at_by_user_id':this.userData[0].id,
                'updated_by_user_type': this.userData[0].role_display_name
    
              };
    
    
              this.apiService.updateProperty(updateData).subscribe(
                (response) => {
                console.log(response);
    
                if (response.status == 'success') {
            
                  this.message = response.message;
                  this.processsavedone=true; 
                  $('#myTable').DataTable().clear().draw();
    
                } else {
                  this.message = 'Update failed!';
                }
    
                this.spinnershow = false;
                },
                (err) => {
                  console.log(err);
                }
    
              ); 
    
              */
                // console.log(updateData);
                //  setTimeout(() =>   { .draw(sds);

                //     this.spinnershow = false;
                //     this.processsavedone=true; 
                //   }
                //   , 1500);
            } // END IF ELSE
        }

    }

    saveIndication(content) {

        this.saveindication = true;

        this.cfmtitlemessage = "Confirm Add Indication"
        this.questionmessage = "Are you sure you want add Indication?";

        this.modalService.open(content, { size: 'sm', centered: true });

    }

    saveProperty(indicationID) {

        let saveData = {
            'postal_code': this.allprop[0].postal_code,
            'old_postal_code': !this.allprop[0].old_postal_code ? 0 : this.allprop[0].old_postal_code,
            'name': this.allprop[0].name,
            'block_num': this.allprop[0].block_num,
            'street_name': this.allprop[0].street_name,
            'floor_num': this.allprop[0].floor_num,
            'unit_num': this.allprop[0].unit_num,

            'created_at_unix_time': moment().unix(),
            'created_at_tz': moment.tz.guess(),
            'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
            'created_at_by_user_id': this.userData[0].id,
            'created_by_user_type': this.userData[0].role_display_name,
            'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')

        };

        this.apiService.createProperty(saveData).subscribe(
            (response) => {
                console.log(response);

                if (response.status == "success") {
                    console.log('PROPERTY SAVED');
                    // $('#myTable').DataTable().clear().draw();

                    // SAVE INDICATION PROPERTIES

                    this.saveIndicationProperties(indicationID, response.inserted_id);
                    // this.message=response.message;
                    //  this.spinnershow = false;
                    //  this.processsavedone=true; 
                }

            },
            (err) => {
                this.spinnershow = false;
                this.processsavedone = true;
                console.log(err);
            }

        );



    }

    saveIndicationProperties(indicationID, propertyID) {
        let saveData = {
            'indication_id': indicationID,
            'property_id': propertyID,

            'created_at_unix_time': moment().unix(),
            'created_at_tz': moment.tz.guess(),
            'created_at_datetime': moment().format('YYYY-MM-DD HH:mm:ss'),
            'created_at_by_user_id': this.userData[0].id,
            'created_by_user_type': this.userData[0].role_display_name,
            'updated_at_datetime': moment('1900-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss')

        };

        this.apiService.createIndicationProperties(saveData).subscribe(
            (response) => {
                console.log(response);

                if (response.status == "success") {
                    console.log('INDICATION PROPERTIES SAVED');
                    // $('#myTable').DataTable().clear().draw();

                    this.message = response.message;
                    this.spinnershow = false;
                    this.processsavedone = true;
                }

            },
            (err) => {
                this.spinnershow = false;
                this.processsavedone = true;
                console.log(err);
            }

        );

    }

    closeModal() {
        this.processsavedone = false;
        this.modalService.dismissAll();
    }

    //  public loadScript() {
    //         console.log('loadScript');

    //         let isFound = false;
    //         const scripts = document.getElementsByTagName('script');
    //         for (let i = 0; i < scripts.length; ++i) {
    //             if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
    //                 isFound = true;
    //                 console.log('loadScript isFound', isFound);
    //             }
    //         }

    //         if (!isFound) {
    //             const dynamicScripts = [
    //                 'assets/js/main.js',
    //                 // 'assets/js/dev_dashboard_datatable.js'
    //             ];

    //             for (let i = 0; i < dynamicScripts.length; i++) {
    //                 const node = document.createElement('script');
    //                 node.src = dynamicScripts[i];
    //                 node.type = 'text/javascript';
    //                 node.async = false;
    //                 // node.charset = 'utf-8';

    //                 document.getElementsByTagName('html')[0].appendChild(node);
    //             }

    //         }
    //   }


    scrollToError(elementid) {
        var element = document.getElementById(elementid);
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    onlyNumbers($event) {
        let regex: RegExp = new RegExp(/^[0-9]{1,}$/g);
        let specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
        if (specialKeys.indexOf($event.key) !== -1) {
            return;
        } else {
            if (regex.test($event.key)) {
                return true;
            } else {
                return false;
            }
        }
    }

    onlyNumbersWithDecimal($event) {
        var charCode = ($event.which) ? $event.which : $event.keyCode
        var value = $event.target.value;
        var dotcontains = value.indexOf(".") != -1;
        if (dotcontains)
            if (charCode == 46) return false;
        if (charCode == 46) return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    //   public scrollToElement($element): void {
    //     console.log($element);
    //     $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    // }

    public loadScript() {
        console.log('loadScript');

        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                isFound = true;
                console.log('loadScript isFound', isFound);
            }
        }

        if (!isFound) {
            console.log('loadScript notisFound');
            const dynamicScripts = [
                'assets/js/main.js',
                // 'assets/js/dev_dashboard_datatable.js'
            ];

            for (let i = 0; i < dynamicScripts.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts[i];
                node.type = 'text/javascript';
                node.async = false;
                // node.charset = 'utf-8';

                document.getElementsByTagName('html')[0].appendChild(node);
            }

        }
    }




}
