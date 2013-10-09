// Jasmine Unit Testing Suite for Product Details Model
// ---------------------------------------------
define(["jquery", "models/ProductDetailsModel"],
 function ($, ProductDetailsModel) {

     // Test spec for Plan details model instance and elements 
     describe("Product Details Attributes Model", function () {

         // Runs before every Model spec
         beforeEach(function () {

             // Instantiates a new Model instance
             this.productDetailModel = new ProductDetailsModel();

             // We are spying on the _validate method to see if it gets called
             spyOn(ProductDetailsModel.prototype, "validate").andCallThrough();

         });

         it("should model is valid ", function () {
             expect(this.productDetailModel.isValid()).toBe(true);
         });

         it("should contain productID attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('productID')).toBe(true);
         });

         it("should contain productNameText attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('productName')).toBe(true);
         });

         it("should contain productApplicantsDeniedPercentage attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('productApplicantsDeniedPercentage')).toBe(true);
         });

         it("should contain productApplicantsUpRatedPercentage attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('productApplicantsUpRatedPercentage')).toBe(true);
         });

         it("should contain issuerID attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('issuerID')).toBe(true);
         });

         it("should contain issuerNameText attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('issuerNameText')).toBe(true);
         });

         it("should contain issuerStateCode attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('issuerStateCode')).toBe(true);
         });

         it("should contain issuerTollFreeNumber attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('issuerTollFreeNumber')).toBe(true);
         });

         it("should contain issuerLocalNumber attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('issuerLocalNumber')).toBe(true);
         });

         it("should contain issuerTTYNumber attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('issuerTTYNumber')).toBe(true);
         });

         it("should contain providerType attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('providerType')).toBe(true);
         });

         it("should contain includedBenefits attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('includedBenefits')).toBe(true);
         });

         it("should contain excludedBenefits attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('excludedBenefits')).toBe(true);
         });

         it("should contain limitedBenefits attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('limitedBenefits')).toBe(true);
         });

         it("should contain additionalBenefits attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('additionalBenefits')).toBe(true);
         });


         it("should contain averageCostPerEnrollee attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('averageCostPerEnrollee')).toBe(true);
         });

         it("should contain hSAEligibleIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('hSAEligibleIndicator')).toBe(true);
         });

         it("should contain sameSexPartnerIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('sameSexPartnerIndicator')).toBe(true);
         });

         it("should contain domesticPartnerIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('domesticPartnerIndicator')).toBe(true);
         });

         it("should contain maternityInNetworkCoverageIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('maternityInNetworkCoverageIndicator')).toBe(true);
         });

         it("should contain mentalInNetworkCoverageIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('mentalInNetworkCoverageIndicator')).toBe(true);
         });

         it("should contain prescriptionInNetworkCoverageIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('prescriptionInNetworkCoverageIndicator')).toBe(true);
         });

         it("should contain substanceAbuseInNetworkCoverageIndicator attribute", function () {
             expect(this.productDetailModel.attributes.hasOwnProperty('substanceAbuseInNetworkCoverageIndicator')).toBe(true);
         });


     describe("Product Details Array Attributes Model", function () {

         describe("InNetworkCostSharing Model", function () {
             it("should contain annualDeductibleAmount attribute", function () {
                 expect(this.productDetailModel.attributes.InNetworkCostSharing.hasOwnProperty('annualDeductibleAmount')).toBe(true);
             });

             it("should contain pCPCopayAmount attribute", function () {
                 expect(this.productDetailModel.attributes.InNetworkCostSharing.hasOwnProperty('pCPCopayAmount')).toBe(true);
             });

             it("should contain coinsuranceRate attribute", function () {
                 expect(this.productDetailModel.attributes.InNetworkCostSharing.hasOwnProperty('coinsuranceRate')).toBe(true);
             });

             it("should contain annualOOPLimitAmount attribute", function () {
                 expect(this.productDetailModel.attributes.InNetworkCostSharing.hasOwnProperty('annualOOPLimitAmount')).toBe(true);
             });

             it("should contain annualMaxBenefitAmount attribute", function () {
                 expect(this.productDetailModel.attributes.InNetworkCostSharing.hasOwnProperty('annualMaxBenefitAmount')).toBe(true);
             });
         });

         describe("OutNetworkCostSharing Model", function () {
             it("should contain annualDeductibleAmount attribute", function () {
                 expect(this.productDetailModel.attributes.OutNetworkCostSharing.hasOwnProperty('annualDeductibleAmount')).toBe(true);
             });

             it("should contain pCPCopayAmount attribute", function () {
                 expect(this.productDetailModel.attributes.OutNetworkCostSharing.hasOwnProperty('pCPCopayAmount')).toBe(true);
             });

             it("should contain coinsuranceRate attribute", function () {
                 expect(this.productDetailModel.attributes.OutNetworkCostSharing.hasOwnProperty('coinsuranceRate')).toBe(true);
             });

             it("should contain annualOOPLimitAmount attribute", function () {
                 expect(this.productDetailModel.attributes.OutNetworkCostSharing.hasOwnProperty('annualOOPLimitAmount')).toBe(true);
             });

             it("should contain annualMaxBenefitAmount attribute", function () {
                 expect(this.productDetailModel.attributes.OutNetworkCostSharing.hasOwnProperty('annualMaxBenefitAmount')).toBe(true);
             });
         });

         describe("IssuerURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.productDetailModel.attributes.IssuerURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.productDetailModel.attributes.IssuerURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.productDetailModel.attributes.IssuerURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("ProviderURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.productDetailModel.attributes.ProviderURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.productDetailModel.attributes.ProviderURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.productDetailModel.attributes.ProviderURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("ProductBenefitURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.productDetailModel.attributes.ProductBenefitURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.productDetailModel.attributes.ProductBenefitURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.productDetailModel.attributes.ProductBenefitURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("ProductFormularyURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.productDetailModel.attributes.ProductFormularyURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.productDetailModel.attributes.ProductFormularyURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.productDetailModel.attributes.ProductFormularyURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });
     });


     describe('calling parse', function () {
         beforeEach(function () {
             this.productDetailModel = new ProductDetailsModel();
         });

         it("should parse single plan", function () {
             this.productDetailModel.parse('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ns2:SmallGroupProductBenefitResponse xmlns:ns2="http://rbis.cms.org/api" xmlns="http://rbis.cms.org/api-types">    <ns2:ResponseHeader>        <ReturnCode>Success</ReturnCode>    </ns2:ResponseHeader>    <ns2:ProductBenefits>        <ns2:ProductBenefit>            <ProductID>50727VA017</ProductID>            <ProductNameText>VA CLASSIC 02</ProductNameText>            <ProductApplicantsDeniedPercentage>0</ProductApplicantsDeniedPercentage>            <ProductApplicantsUpRatedPercentage>0</ProductApplicantsUpRatedPercentage>            <IssuerID>50727</IssuerID>            <IssuerNameText>Humana Insurance Company</IssuerNameText>            <IssuerStateCode>VA</IssuerStateCode>            <IssuerTollFreeNumber>18777204854</IssuerTollFreeNumber>            <IssuerLocalNumber>18777204854</IssuerLocalNumber>            <IssuerTTYNumber>18003252028</IssuerTTYNumber>            <ProviderType>INDEMNITY</ProviderType>            <AverageCostPerEnrollee xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            <HSAEligibleIndicator>false</HSAEligibleIndicator>            <SameSexPartnerIndicator>false</SameSexPartnerIndicator>            <DomesticPartnerIndicator>false</DomesticPartnerIndicator>            <MaternityInNetworkCoverageIndicator>true</MaternityInNetworkCoverageIndicator>            <MentalInNetworkCoverageIndicator>true</MentalInNetworkCoverageIndicator>            <PrescriptionInNetworkCoverageIndicator>true</PrescriptionInNetworkCoverageIndicator>            <SubstanceAbuseInNetworkCoverageIndicator>true</SubstanceAbuseInNetworkCoverageIndicator>            <InNetworkCostSharing>                <AnnualDeductibleAmount>                    <Amounts>                        <Amount>500</Amount>                        <Amount>1000</Amount>                    </Amounts>                </AnnualDeductibleAmount>                <PCPCopayAmount>                    <None>None</None>                </PCPCopayAmount>                <CoinsuranceRate>                    <Min>20</Min>                    <Max>20</Max>                </CoinsuranceRate>                <AnnualOOPLimitAmount>                    <Amounts>                        <Amount>1000</Amount>                        <Amount>2000</Amount>                    </Amounts>                </AnnualOOPLimitAmount>                <AnnualMaxBenefitAmount>                    <None>None</None>                </AnnualMaxBenefitAmount>            </InNetworkCostSharing>            <OutNetworkCostSharing>                <AnnualDeductibleAmount>                    <None>None</None>                </AnnualDeductibleAmount>                <PCPCopayAmount>                    <None>None</None>                </PCPCopayAmount>                <CoinsuranceRate>                    <None>None</None>                </CoinsuranceRate>                <AnnualOOPLimitAmount>                    <None>None</None>                </AnnualOOPLimitAmount>                <AnnualMaxBenefitAmount>                    <None>None</None>                </AnnualMaxBenefitAmount>            </OutNetworkCostSharing>            <IssuerURL>                <URLCode>Valid</URLCode>                <URLAddress>http://humana.com</URLAddress>                <AlternateText xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            </IssuerURL>            <ProviderURL>                <URLCode>Not Valid</URLCode>                <URLAddress></URLAddress>                <AlternateText>No physician or hospital network</AlternateText>            </ProviderURL>            <ProductBenefitURL>                <URLCode>Valid</URLCode>                <URLAddress>http://apps.humana.com/marketing/documents.asp?file=60086</URLAddress>                <AlternateText></AlternateText>            </ProductBenefitURL>            <ProductFormularyURL>                <URLCode>Valid</URLCode>                <URLAddress></URLAddress>                <AlternateText>URL Pending Quality Evaluation</AlternateText>            </ProductFormularyURL>            <PrimaryCareVisit>Covered</PrimaryCareVisit>            <SpecialistVisit>Covered</SpecialistVisit>            <OtherPractitionerVisit>Covered</OtherPractitionerVisit>            <PreventiveCare>Covered</PreventiveCare>            <DiagnosticTest>Covered</DiagnosticTest>            <Imaging>Covered</Imaging>            <GenericDrugs>Covered</GenericDrugs>            <PreferredBrandDrugs>Covered</PreferredBrandDrugs>            <NonPreferredBrandDrugs>Covered</NonPreferredBrandDrugs>            <SpecialtyDrugs>Covered</SpecialtyDrugs>            <OutpatientFacilityFee>Covered</OutpatientFacilityFee>            <OutpatientPhysicianFee>Covered</OutpatientPhysicianFee>            <EmergencyRoom>Covered</EmergencyRoom>            <EmergencyTransportation>Covered</EmergencyTransportation>            <UrgentCare>Covered</UrgentCare>            <HospitalFacilityFee>Covered</HospitalFacilityFee>            <HospitalPhysicianFee>Covered</HospitalPhysicianFee>            <MentalOutpatient>Covered with Limitations</MentalOutpatient>            <MentalInpatient>Covered with Limitations</MentalInpatient>            <SubstanceDisorderOutpatient>Covered with Limitations</SubstanceDisorderOutpatient>            <SubstanceDisorderInpatient>Covered with Limitations</SubstanceDisorderInpatient>            <PrenatalPostnatalCare>Covered</PrenatalPostnatalCare>            <DeliveryInpatient>Covered</DeliveryInpatient>            <HomeHealthcare>Covered with Limitations</HomeHealthcare>            <OutpatientRehabilitation>Covered with Limitations</OutpatientRehabilitation>            <Habilitation>Covered with Limitations</Habilitation>            <NursingCare>Covered with Limitations</NursingCare>            <DurableMedicalEquipment>Covered</DurableMedicalEquipment>            <Hospice>Covered</Hospice>            <RoutineEyeCareChildren>Not Covered</RoutineEyeCareChildren>            <EyeGlassesChildren>Not Covered</EyeGlassesChildren>            <DentalCheckUpChildren>Not Covered</DentalCheckUpChildren>            <Acupuncture>Not Covered</Acupuncture>            <BariatricSurgery>Available for Additional Premium</BariatricSurgery>            <NonEmergencyTravelOutside>Covered</NonEmergencyTravelOutside>            <Chiropractic>Covered with Limitations</Chiropractic>            <CosmeticSurgery>Not Covered</CosmeticSurgery>            <DentalAdult>Not Covered</DentalAdult>            <HearingAid>Not Covered</HearingAid>            <InfertilityTreatment>Not Covered</InfertilityTreatment>            <LongTermCare>Not Covered</LongTermCare>            <PrivateNursing>Not Covered</PrivateNursing>            <EyeExamAdult>Not Covered</EyeExamAdult>            <RoutineFootCare>Not Covered</RoutineFootCare>            <WeightLossProgram>Not Covered</WeightLossProgram>        </ns2:ProductBenefit>    </ns2:ProductBenefits>    <ns2:SmallGroupProductBenefitRequest>        <ns2:ProductIDs>            <ns2:ProductID>50727VA017</ns2:ProductID>        </ns2:ProductIDs>    </ns2:SmallGroupProductBenefitRequest></ns2:SmallGroupProductBenefitResponse>');
         });


//         it("should throw error", function () {
//             this.productDetailModel.parse('<ns2:IndividualPlanBenefitResponsexmlns:ns2="http://rbis.cms.org/api"xmlns="http://rbis.cms.org/api-types"><ns2:ResponseHeader><ReturnCode>Error</ReturnCode><ErrorMessage>Requestisnotvalidfortheschema</ErrorMessage></ns2:ResponseHeader><ns2:PlanBenefits/></ns2:IndividualPlanBenefitResponse>');
//         });

         it("should handle null gracefully", function () {
             this.productDetailModel.parse(undefined);
         });

     });

     // Test Spec for Plan details model validation
     describe("Product Details Validation Model", function () {
         it("should allow you to set a valid productID with 10 alphanumeric chars", function () {
             this.productDetailModel.set({ "productID": "33104VA006" }, { validate: true, validateAll: false });
             expect(this.productDetailModel.get("productID")).toEqual("33104VA006");
         });

         it("should allow you to set a planNameText", function () {
             this.productDetailModel.set({ "productNameText": "Virginia Standard 750" }, { validate: true, validateAll: false });
             expect(this.productDetailModel.get("productNameText")).toEqual("Virginia Standard 750");
         });

         it("should not allow you to set a productID less than 14 chars", function () {
             expect(this.productDetailModel.set({ "productID": "16064VA0080" }, { validate: true, validateAll: false })).toEqual(false);
         });

         it("should not allow you to set a productID greater than 10 chars", function () {
             expect(this.productDetailModel.set({ "productID": "33104VA00611" }, { validate: true, validateAll: false })).toEqual(false);
         });

         it("should not allow you to set special chars in productID", function () {
             expect(this.productDetailModel.set({ "productID": "@#33104VA0" }, { validate: true, validateAll: false })).toEqual(false);
         });

         it("should not have empty productID", function () {
             expect(this.productDetailModel.set({ "productID": "" }, { validate: true, validateAll: false })).toEqual(false);
         });
     });

     });


 });