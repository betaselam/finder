// Jasmine Unit Testing Suite for Plan Details Model
// ---------------------------------------------
define(["jquery", "models/PlanDetailsModel"],
 function ($, PlanDetailsModel) {

     // Runs before every Model spec
     beforeEach(function () {

         // Instantiates a new Model instance
         this.model = new PlanDetailsModel();

         // We are spying on the _validate method to see if it gets called
         spyOn(PlanDetailsModel.prototype, "validate").andCallThrough();

     });

     // Test spec for Plan details model instance and elements 
     describe("Plan Details Attributes Model", function () {

         it("should model is valid ", function () {
             expect(this.model.isValid()).toBe(true);
         });

         it("should contain planID attribute", function () {
             expect(this.model.attributes.hasOwnProperty('planID')).toBe(true);
         });

         it("should contain planNameText attribute", function () {
             expect(this.model.attributes.hasOwnProperty('planNameText')).toBe(true);
         });

         it("should contain productID attribute", function () {
             expect(this.model.attributes.hasOwnProperty('productID')).toBe(true);
         });

         it("should contain productNameText attribute", function () {
             expect(this.model.attributes.hasOwnProperty('productNameText')).toBe(true);
         });

         it("should contain productApplicantsDeniedPercentage attribute", function () {
             expect(this.model.attributes.hasOwnProperty('productApplicantsDeniedPercentage')).toBe(true);
         });

         it("should contain productApplicantsUpRatedPercentage attribute", function () {
             expect(this.model.attributes.hasOwnProperty('productApplicantsUpRatedPercentage')).toBe(true);
         });

         it("should contain issuerID attribute", function () {
             expect(this.model.attributes.hasOwnProperty('issuerID')).toBe(true);
         });

         it("should contain issuerNameText attribute", function () {
             expect(this.model.attributes.hasOwnProperty('issuerNameText')).toBe(true);
         });

         it("should contain issuerStateCode attribute", function () {
             expect(this.model.attributes.hasOwnProperty('issuerStateCode')).toBe(true);
         });

         it("should contain issuerTollFreeNumber attribute", function () {
             expect(this.model.attributes.hasOwnProperty('issuerTollFreeNumber')).toBe(true);
         });

         it("should contain issuerLocalNumber attribute", function () {
             expect(this.model.attributes.hasOwnProperty('issuerLocalNumber')).toBe(true);
         });

         it("should contain issuerTTYNumber attribute", function () {
             expect(this.model.attributes.hasOwnProperty('issuerTTYNumber')).toBe(true);
         });

         it("should contain providerType attribute", function () {
             expect(this.model.attributes.hasOwnProperty('providerType')).toBe(true);
         });

         it("should contain baseRateAmount attribute", function () {
             expect(this.model.attributes.hasOwnProperty('baseRateAmount')).toBe(true);
         });

         it("should contain hSAEligibleIndicator attribute", function () {
             expect(this.model.attributes.hasOwnProperty('hSAEligibleIndicator')).toBe(true);
         });


         describe("InNetworkCostSharing Model", function () {
             it("should contain familyAnnualDeductibleAmount attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('familyAnnualDeductibleAmount')).toBe(true);
             });

             it("should contain individualAnnualDeductibleAmount attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('individualAnnualDeductibleAmount')).toBe(true);
             });

             it("should contain familyAnnualOOPLimitAmount attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('familyAnnualOOPLimitAmount')).toBe(true);
             });

             it("should contain individualAnnualOOPLimitAmount attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('individualAnnualOOPLimitAmount')).toBe(true);
             });

             it("should contain annualOOPElementsText attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('annualOOPElementsText')).toBe(true);
             });

             it("should contain familyAnnualMaxBenefitAmount attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('familyAnnualMaxBenefitAmount')).toBe(true);
             });

             it("should contain individualAnnualMaxBenefitAmount attribute", function () {
                 expect(this.model.attributes.InNetworkCostSharing.hasOwnProperty('individualAnnualMaxBenefitAmount')).toBe(true);
             });

         });

         describe("IssuerURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.model.attributes.IssuerURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.model.attributes.IssuerURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.model.attributes.IssuerURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("ProviderURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.model.attributes.ProviderURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.model.attributes.ProviderURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.model.attributes.ProviderURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("ProductBenefitURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.model.attributes.ProductBenefitURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.model.attributes.ProductBenefitURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.model.attributes.ProductBenefitURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("ProductFormularyURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.model.attributes.ProductFormularyURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.model.attributes.ProductFormularyURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.model.attributes.ProductFormularyURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("PlanBrochureURL Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.model.attributes.PlanBrochureURL.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.model.attributes.PlanBrochureURL.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.model.attributes.PlanBrochureURL.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("SBC Model", function () {
             it("should contain uRLCode attribute", function () {
                 expect(this.model.attributes.SBC.hasOwnProperty('uRLCode')).toBe(true);
             });

             it("should contain uRLAddress attribute", function () {
                 expect(this.model.attributes.SBC.hasOwnProperty('uRLAddress')).toBe(true);
             });

             it("should contain alternateText attribute", function () {
                 expect(this.model.attributes.SBC.hasOwnProperty('alternateText')).toBe(true);
             });
         });

         describe("OtherPractitionerVisit Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.OtherPractitionerVisit.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.OtherPractitionerVisit.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.OtherPractitionerVisit.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("PrimaryCareVisit Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.PrimaryCareVisit.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.PrimaryCareVisit.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.PrimaryCareVisit.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("SpecialistVisit Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.SpecialistVisit.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.SpecialistVisit.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.SpecialistVisit.hasOwnProperty('exception')).toBe(true);
             });
         });


         describe("DiagnosticTest Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.DiagnosticTest.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.DiagnosticTest.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.DiagnosticTest.hasOwnProperty('exception')).toBe(true);
             });
         });


         describe("OutpatientFacilityFee Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.OutpatientFacilityFee.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.OutpatientFacilityFee.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.OutpatientFacilityFee.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("OutpatientPhysicianFee Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.OutpatientPhysicianFee.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.OutpatientPhysicianFee.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.OutpatientPhysicianFee.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("HospitalFacilityFee Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.HospitalFacilityFee.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.HospitalFacilityFee.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.HospitalFacilityFee.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("HospitalPhysicianFee Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.HospitalPhysicianFee.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.HospitalPhysicianFee.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.HospitalPhysicianFee.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("EmergencyRoom Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.EmergencyRoom.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.EmergencyRoom.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.EmergencyRoom.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("MentalOutpatient Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.MentalOutpatient.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.MentalOutpatient.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.MentalOutpatient.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("MentalInpatient Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.MentalInpatient.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.MentalInpatient.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.MentalInpatient.hasOwnProperty('exception')).toBe(true);
             });
         });





         describe("SubstanceDisorderOutpatient Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.SubstanceDisorderOutpatient.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.SubstanceDisorderOutpatient.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.SubstanceDisorderOutpatient.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("SubstanceDisorderInpatient Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.SubstanceDisorderInpatient.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.SubstanceDisorderInpatient.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.SubstanceDisorderInpatient.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("PrenatalPostnatalCare Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.PrenatalPostnatalCare.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.PrenatalPostnatalCare.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.PrenatalPostnatalCare.hasOwnProperty('exception')).toBe(true);
             });
         });

         describe("DeliveryInpatient Model", function () {
             it("should contain inNetwork attribute", function () {
                 expect(this.model.attributes.DeliveryInpatient.hasOwnProperty('inNetwork')).toBe(true);
             });

             it("should contain outOfNetwork attribute", function () {
                 expect(this.model.attributes.DeliveryInpatient.hasOwnProperty('outOfNetwork')).toBe(true);
             });

             it("should contain exception attribute", function () {
                 expect(this.model.attributes.DeliveryInpatient.hasOwnProperty('exception')).toBe(true);
             });
         });

         it("should contain genericDrugs attribute", function () {
             expect(this.model.attributes.hasOwnProperty('genericDrugs')).toBe(true);
         });

         it("should contain preferredBrandDrugs attribute", function () {
             expect(this.model.attributes.hasOwnProperty('preferredBrandDrugs')).toBe(true);
         });

         it("should contain specialtyDrugs attribute", function () {
             expect(this.model.attributes.hasOwnProperty('specialtyDrugs')).toBe(true);
         });

         it("should contain includedBenfits attribute", function () {
             expect(this.model.attributes.hasOwnProperty('includedBenfits')).toBe(true);
         });

         it("should contain excludedBenfits attribute", function () {
             expect(this.model.attributes.hasOwnProperty('excludedBenfits')).toBe(true);
         });

         it("should contain limitedBenfits attribute", function () {
             expect(this.model.attributes.hasOwnProperty('limitedBenfits')).toBe(true);
         });

         it("should contain additionalBenfits attribute", function () {
             expect(this.model.attributes.hasOwnProperty('additionalBenfits')).toBe(true);
         });

     });

     // Test Spec for Plan details model validation
     describe("Plan Details Validation Model", function () {

     });

     describe('calling parse', function () {
         beforeEach(function () {
             this.planModel = new PlanDetailsModel();
         });

         it("should parse single plan", function () {
             this.planModel.parse('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ns2:IndividualPlanBenefitResponse xmlns:ns2="http://rbis.cms.org/api" xmlns="http://rbis.cms.org/api-types">    <ns2:ResponseHeader>        <ReturnCode>Success</ReturnCode>    </ns2:ResponseHeader>    <ns2:PlanBenefits>        <ns2:PlanBenefit>            <PlanID>16064VA0190004</PlanID>            <PlanNameText>Lumenos HSA Standard Family 3000</PlanNameText>            <ProductID>16064VA019</ProductID>            <ProductNameText>Lumenos HSA Standard</ProductNameText>            <ProductApplicantsDeniedPercentage>1</ProductApplicantsDeniedPercentage>            <ProductApplicantsUpRatedPercentage>91</ProductApplicantsUpRatedPercentage>            <IssuerID>16064</IssuerID>            <IssuerNameText>Anthem Health Plans of VA(Anthem BCBS)</IssuerNameText>            <IssuerStateCode>VA</IssuerStateCode>            <IssuerTollFreeNumber>18003040372</IssuerTollFreeNumber>            <IssuerLocalNumber>18003040372</IssuerLocalNumber>            <IssuerTTYNumber xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            <ProviderType>PPO</ProviderType>            <BaseRateAmount>678.00</BaseRateAmount>            <HSAEligibleIndicator>true</HSAEligibleIndicator>            <SameSexPartnerIndicator>true</SameSexPartnerIndicator>            <DomesticPartnerIndicator>true</DomesticPartnerIndicator>            <MaternityInNetworkCoverageIndicator>false</MaternityInNetworkCoverageIndicator>            <MentalInNetworkCoverageIndicator>true</MentalInNetworkCoverageIndicator>            <PrescriptionInNetworkCoverageIndicator>true</PrescriptionInNetworkCoverageIndicator>            <SubstanceAbuseInNetworkCoverageIndicator>true</SubstanceAbuseInNetworkCoverageIndicator>            <InNetworkCostSharing>                <FamilyAnnualDeductibleAmount>                    <Amount>3000</Amount>                </FamilyAnnualDeductibleAmount>                <IndividualAnnualDeductibleAmount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualAnnualDeductibleAmount>                <PCPCopayAmount>                    <CoveredAmount>0</CoveredAmount>                </PCPCopayAmount>                <CoinsuranceRate>                    <CoveredPercent>20</CoveredPercent>                </CoinsuranceRate>                <FamilyAnnualOOPLimitAmount>                    <Amount>9000</Amount>                </FamilyAnnualOOPLimitAmount>                <IndividualAnnualOOPLimitAmount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualAnnualOOPLimitAmount>                <AnnualOOPElementsText>Deductible + Coinsurance</AnnualOOPElementsText>                <FamilyAnnualMaxBenefitAmount>                    <NoMaximum>No Maximum</NoMaximum>                </FamilyAnnualMaxBenefitAmount>                <IndividualAnnualMaxBenefitAmount>                    <NoMaximum>No Maximum</NoMaximum>                </IndividualAnnualMaxBenefitAmount>                <NoDeductibleServicesText>Routine and Preventive care services</NoDeductibleServicesText>                <DeductibleExceptionsServicesText>None</DeductibleExceptionsServicesText>                <OtherDeductible1ServicesText>None</OtherDeductible1ServicesText>                <IndividualOtherDeductible1Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualOtherDeductible1Amount>                <FamilyOtherDeductible1Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyOtherDeductible1Amount>                <OtherDeductible2ServicesText>None</OtherDeductible2ServicesText>                <IndividualOtherDeductible2Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualOtherDeductible2Amount>                <FamilyOtherDeductible2Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyOtherDeductible2Amount>                <OtherDeductible3ServicesText>None</OtherDeductible3ServicesText>                <IndividualOtherDeductible3Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualOtherDeductible3Amount>                <FamilyOtherDeductible3Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyOtherDeductible3Amount>                <AdditionalDeductibleServicesIndicator xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>                <ExcludedAnnualOOPLimitText>Premiums, Copayments and Balance-billing charges</ExcludedAnnualOOPLimitText>            </InNetworkCostSharing>            <OutNetworkCostSharing>                <FamilyAnnualDeductibleAmount>                    <Amount>3000</Amount>                </FamilyAnnualDeductibleAmount>                <IndividualAnnualDeductibleAmount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualAnnualDeductibleAmount>                <PCPCopayAmount>                    <CoveredAmount>0</CoveredAmount>                </PCPCopayAmount>                <CoinsuranceRate>                    <CoveredPercent>40</CoveredPercent>                </CoinsuranceRate>                <FamilyAnnualOOPLimitAmount>                    <Amount>18000</Amount>                </FamilyAnnualOOPLimitAmount>                <IndividualAnnualOOPLimitAmount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualAnnualOOPLimitAmount>                <AnnualOOPElementsText>Deductible + Coinsurance</AnnualOOPElementsText>                <FamilyAnnualMaxBenefitAmount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyAnnualMaxBenefitAmount>                <IndividualAnnualMaxBenefitAmount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualAnnualMaxBenefitAmount>                <NoDeductibleServicesText>Routine and Preventive care services</NoDeductibleServicesText>                <DeductibleExceptionsServicesText>None</DeductibleExceptionsServicesText>                <OtherDeductible1ServicesText>None</OtherDeductible1ServicesText>                <IndividualOtherDeductible1Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualOtherDeductible1Amount>                <FamilyOtherDeductible1Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyOtherDeductible1Amount>                <OtherDeductible2ServicesText>None</OtherDeductible2ServicesText>                <IndividualOtherDeductible2Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualOtherDeductible2Amount>                <FamilyOtherDeductible2Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyOtherDeductible2Amount>                <OtherDeductible3ServicesText>None</OtherDeductible3ServicesText>                <IndividualOtherDeductible3Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </IndividualOtherDeductible3Amount>                <FamilyOtherDeductible3Amount>                    <NotApplicable>Not Applicable</NotApplicable>                </FamilyOtherDeductible3Amount>                <AdditionalDeductibleServicesIndicator xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>                <ExcludedAnnualOOPLimitText>Premiums, Copayments and Balance-billing charges</ExcludedAnnualOOPLimitText>            </OutNetworkCostSharing>            <IssuerURL>                <URLCode>Valid</URLCode>                <URLAddress>http://www.anthem.com</URLAddress>                <AlternateText xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            </IssuerURL>            <ProviderURL>                <URLCode>Valid</URLCode>                <URLAddress>http://www.anthem.com/health-insurance/provider-directory/searchcriteria?branding=ABCBS&amp;state=VA</URLAddress>                <AlternateText></AlternateText>            </ProviderURL>            <ProductBenefitURL>                <URLCode>Valid</URLCode>                <URLAddress>http://docs.anthem.com/wellpoint/docs/viewDocument?mcItemNbr=VABR13005XLD</URLAddress>                <AlternateText></AlternateText>            </ProductBenefitURL>            <ProductFormularyURL>                <URLCode>Valid</URLCode>                <URLAddress>http://www.anthem.com/health-insurance/nsecurepdf/pharmacy_ABCBS_Anthem_Natl_DL_tiered</URLAddress>                <AlternateText>URL Pending Quality Evaluation</AlternateText>            </ProductFormularyURL>            <PlanBrochureURL>                <URLCode>Valid</URLCode>                <URLAddress>http://docs.anthem.com/wellpoint/docs/viewDocument?mcItemNbr=VABR13005XLD</URLAddress>                <AlternateText></AlternateText>            </PlanBrochureURL>            <OtherPractitionerVisit>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </OtherPractitionerVisit>            <PrimaryCareVisit>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </PrimaryCareVisit>            <SpecialistVisit>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </SpecialistVisit>            <PreventiveCare>                <InNetwork>                    <Benefit>No Charge</Benefit>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited and meets all Federal and State guidelines.</LimitationTypeText>            </PreventiveCare>            <DiagnosticTest>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </DiagnosticTest>            <Imaging>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </Imaging>            <OutpatientFacilityFee>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </OutpatientFacilityFee>            <OutpatientPhysicianFee>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </OutpatientPhysicianFee>            <EmergencyRoom>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </EmergencyRoom>            <EmergencyTransportation>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </EmergencyTransportation>            <UrgentCare>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </UrgentCare>            <HospitalFacilityFee>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </HospitalFacilityFee>            <HospitalPhysicianFee>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </HospitalPhysicianFee>            <MentalOutpatient>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 20 outpatient visits per member per benefit year for Mental/Behavioral Health and Substance Abuse Services combined.</LimitationTypeText>            </MentalOutpatient>            <MentalInpatient>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 25 inpatient days per member per benefit year for Mental/Behavioral Health and Substance Abuse Services combined.</LimitationTypeText>            </MentalInpatient>            <SubstanceDisorderOutpatient>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 20 outpatient visits per member per benefit year for Mental/Behavioral Health and Substance Abuse Services combined.</LimitationTypeText>            </SubstanceDisorderOutpatient>            <SubstanceDisorderInpatient>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 25 inpatient days per member per benefit year for Mental/Behavioral Health and Substance Abuse Services combined.</LimitationTypeText>            </SubstanceDisorderInpatient>            <PrenatalPostnatalCare>                <InNetwork>                    <Benefit>Not Covered</Benefit>                </InNetwork>                <OutOfNetwork>                    <Benefit>Not Covered</Benefit>                </OutOfNetwork>                <LimitationTypeText>None</LimitationTypeText>            </PrenatalPostnatalCare>            <DeliveryInpatient>                <InNetwork>                    <Benefit>Not Covered</Benefit>                </InNetwork>                <OutOfNetwork>                    <Benefit>Not Covered</Benefit>                </OutOfNetwork>                <LimitationTypeText>None</LimitationTypeText>            </DeliveryInpatient>            <HomeHealthcare>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 90 visits per member per benefit year for in and out of network situations combined.</LimitationTypeText>            </HomeHealthcare>            <InpatientRehabilitation>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </InpatientRehabilitation>            <OutpatientRehabilitation>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 20 combined outpatient physical &amp; occupational therapy visits along with a limit of 20 speech therapy visits per benefit year for in and out of network </LimitationTypeText>            </OutpatientRehabilitation>            <NursingCare>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to 100 days per member per benefit year and combined for in and out of network.</LimitationTypeText>            </NursingCare>            <DurableMedicalEquipment>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for services/conditions that are considered pre-existing, not medically necessary, experimental/investigative or specifically listed in the contract or certificate</LimitationTypeText>            </DurableMedicalEquipment>            <Hospice>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>No coverage for member diagnosed with life expectancy of more than 6 months who elects to receive curative care instead of palliative care. </LimitationTypeText>            </Hospice>            <RoutineEyeCareChildren>                <InNetwork>                    <Benefit>Not Covered</Benefit>                </InNetwork>                <OutOfNetwork>                    <Benefit>Not Covered</Benefit>                </OutOfNetwork>                <LimitationTypeText>None</LimitationTypeText>            </RoutineEyeCareChildren>            <EyeGlassesChildren>                <InNetwork>                    <Benefit>Not Covered</Benefit>                </InNetwork>                <OutOfNetwork>                    <Benefit>Not Covered</Benefit>                </OutOfNetwork>                <LimitationTypeText>None</LimitationTypeText>            </EyeGlassesChildren>            <DentalCheckUpChildren>                <InNetwork>                    <Benefit>Not Covered</Benefit>                </InNetwork>                <OutOfNetwork>                    <Benefit>Not Covered</Benefit>                </OutOfNetwork>                <LimitationTypeText>None</LimitationTypeText>            </DentalCheckUpChildren>            <GenericDrugsRetail>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </GenericDrugsRetail>            <GenericDrugsMailOrder>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </GenericDrugsMailOrder>            <PreferredBrandDrugsRetail>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </PreferredBrandDrugsRetail>            <PreferredBrandDrugsMailOrder>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </PreferredBrandDrugsMailOrder>            <NonPreferredBrandDrugsRetail>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </NonPreferredBrandDrugsRetail>            <NonPreferredBrandDrugsMailOrder>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </NonPreferredBrandDrugsMailOrder>            <SpecialtyDrugsRetail>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </SpecialtyDrugsRetail>            <SpecialtyDrugsMailOrder>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </OutOfNetwork>                <LimitationTypeText>Coverage is limited to allowable charge for OON situations and member is responsible for difference between pharmacy charge and allowable charge.  </LimitationTypeText>            </SpecialtyDrugsMailOrder>            <HabilitationServices>                <InNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>20</Percent>                </InNetwork>                <OutOfNetwork>                    <Benefit>X% Coinsurance after deductible</Benefit>                    <Percent>40</Percent>                </OutOfNetwork>                <LimitationTypeText>All Rehabilitation and Habilitation visits count towards your defined Rehabilitation benefit limits.</LimitationTypeText>            </HabilitationServices>            <Acupuncture>Not Covered</Acupuncture>            <BariatricSurgery>Covered with Limitations</BariatricSurgery>            <NonEmergencyTravelOutside>Covered with Limitations</NonEmergencyTravelOutside>            <Chiropractic>Covered with Limitations</Chiropractic>            <CosmeticSurgery>Not Covered</CosmeticSurgery>            <DentalAdult>Covered with Limitations</DentalAdult>            <HearingAid>Not Covered</HearingAid>            <InfertilityTreatment>Not Covered</InfertilityTreatment>            <LongTermCare>Not Covered</LongTermCare>            <PrivateNursing>Not Covered</PrivateNursing>            <EyeExamAdult>Not Covered</EyeExamAdult>            <RoutineFootCare>Not Covered</RoutineFootCare>            <WeightLossProgram>Not Covered</WeightLossProgram>            <RoutineHearingTests>Not Covered</RoutineHearingTests>            <SpecialistReferralRequiredIndicator xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            <SpecialistReferralRequiredServicesText>None</SpecialistReferralRequiredServicesText>            <PregnancyNotificationRequiredIndicator xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            <MaternityCoverage>                <DeductibleAmount>2790.00</DeductibleAmount>                <CopayAmount>0.00</CopayAmount>                <CoinsuranceAmount>4480.00</CoinsuranceAmount>                <LimitsOrExclusionsAmount>150.00</LimitsOrExclusionsAmount>            </MaternityCoverage>            <DiabetesWellnessProgramOfferedIndicator>true</DiabetesWellnessProgramOfferedIndicator>            <DiabetesCoverage>                <DeductibleAmount>1150.00</DeductibleAmount>                <CopayAmount>0.00</CopayAmount>                <CoinsuranceAmount>820.00</CoinsuranceAmount>                <LimitsOrExclusionsAmount>80.00</LimitsOrExclusionsAmount>            </DiabetesCoverage>            <SBC>                <PDFURL>                    <URLCode>Valid</URLCode>                    <URLAddress>https://rbis2gateway.insuranceoversight.hhs.gov/RBIS-API/v5.6/REST/getSBCReportFile?planId=16064VA0190004&amp;fileType=pdf</URLAddress>                    <AlternateText xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>                </PDFURL>                <HTMLURL xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>            </SBC>        </ns2:PlanBenefit>    </ns2:PlanBenefits>    <ns2:IndividualPlanBenefitRequest>        <ns2:Enrollees>            <Primary>                <DateOfBirth>1977-01-01</DateOfBirth>                <Gender>Male</Gender>                <TobaccoUser>Non-Smoker</TobaccoUser>            </Primary>        </ns2:Enrollees>        <ns2:Location>            <ZipCode>22033</ZipCode>        </ns2:Location>        <ns2:InsuranceEffectiveDate>2013-11-01</ns2:InsuranceEffectiveDate>        <ns2:PlanIDs>            <ns2:PlanID>16064VA0190004</ns2:PlanID>        </ns2:PlanIDs>    </ns2:IndividualPlanBenefitRequest></ns2:IndividualPlanBenefitResponse>');
         });


//         it("should throw error", function () {
//             this.planModel.parse('<ns2:IndividualPlanBenefitResponsexmlns:ns2="http://rbis.cms.org/api"xmlns="http://rbis.cms.org/api-types"><ns2:ResponseHeader><ReturnCode>Error</ReturnCode><ErrorMessage>Requestisnotvalidfortheschema</ErrorMessage></ns2:ResponseHeader><ns2:PlanBenefits/></ns2:IndividualPlanBenefitResponse>');
//         });

         it("should handle null gracefully", function () {
             this.planModel.parse(undefined);
         });

     });
 });