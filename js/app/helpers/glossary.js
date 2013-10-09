define(["jquery",
        "backbone",
        "tooltip",
        "popover",
        "jqueryui"
     ],

    function ($,
              Backbone,
              Tooltip,
              Popover,
              jqueryui
              ) {

        var Glossary = {

            "Dialog-Empcntles-Alert": {
                "title": "Special rules about allowable group size may apply in your state. Check with your state’s department of Insurance or your insurance carrier to confirm "+
                         "your eligibility for the small group market if you have fewer than two or more than 50 employees."
            },
            "Dialog-Empcntgrt-Alert": {
                "title": "Groups of more than 100 are considered to be large groups. This website does not provide information about products in the large group market." + 
                         "Please provide an insurance carrier or an insurance professional for information about large group products."
            },

            popoverContextualHelp: function (elementId, data) {

                if (elementId.indexOf("In-Network-Out-of-Pocket-Limit") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'In-Network Out-of-Pocket Limit',
                        html: 'true',
                        content:
                        "<p>The maximum amount you will have to pay for in-network covered services in a year. Generally this includes the deductible, coinsurance, and copayments </p>" +
                        "<p>This definition may vary from plan to plan. For example, in some plans the in-network out-of-pocket limit doesn't include" +
                        "cost sharing for all services, such as prescription drugs. Plans may have different in-network out-of-pocket limits for different services.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });

                } else if (elementId.indexOf("Provider-Type-PPO") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'PPO (Preferred Provider Organization)',
                        html: 'true',
                        content:
                        "<p>A type of health plan that contracts with medical providers, such as hospitals and doctors, to create a network of participating providers. You pay less if you use providers that belong to the plan's network.</p>" +
                        "<p>You can use doctors, hospitals, and providers outside of the network at an additional cost. However, you may pay a higher cost sharing amount under the plan and be responsible for the difference between the amount" +
                        "billed by the provider and the amount allowed under the plan. Also, you may have to file paperwork that results from using an out-of-network physician or facility, with no help from the provider's office.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Provider-Type-HMO") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'HMO (Health Maintenance Organization)',
                        html: 'true',
                        content:
                        "<p>A type of health insurance that usually limits non-emergency coverage to care from doctors and other providers (such as hospitals or nursing homes) who work for or contract with the HMO. HMOs often offer integrated care and focus on prevention and wellness and coordination of care. You may need to designate a primary care physician and obtain a referral from him or her to see a specialist.</p>" +
                        "<p>HMOs generally won't cover out-of-network care except in an emergency. An HMO will generally require you to live or work in its service area to be eligible for coverage.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Provider-Type-INDEMNITY") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Indemnity',
                        html: 'true',
                        content:
                        "<p>Also known as \"Fee-for-Service\" plans, indemnity plans allow you to choose your providers from among any provider that agrees to treat you.</p>" +
                        "<p>While indemnity plans allow the most flexibility, they tend to cost you more than other plans - both in higher premiums, and in what you pay for services (for example, you often have to pay for charges in excess of allowed amounts). Indemnity plans also typically require you to handle your own paperwork, rather than the doctor's office handling it for you.",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Provider-Type-POS") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'POS (Point of Service)',
                        html: 'true',
                        content:
                        "<p>A type of plan in which you pay less if you use doctors, hospitals, and other health care providers that belong to the plan's network. POS plans may require you to get a referral from your primary care doctor in order to see a specialist.</p>" +
                        "<p>You may choose to see a provider that is out-of-network. However, you may pay a higher cost sharing amount under the plan and be responsible for the difference between the amount billed by the provider and the amount allowed under the plan.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Provider-Type-EPO") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'EPO (Exclusive Provider Option)',
                        html: 'true',
                        content:
                         "<p>Similar to an HMO, a managed care plan under which non-emergency services are covered only if you go to doctors, specialists, or hospitals in the plan's network.</p>" +
                         "<p>Using an out-of-network provider or facility will mean you pay the full cost of the services. You will not be paid back for using these services.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                }
                else if (elementId.indexOf("Annual-Out-of-Pocket-Maximum") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Annual Out-of-Pocket Maximum Options',
                        html: 'true',
                        content:
                        "<p>An annual out-of-pocket maximum is the amount an employee will have to pay in a year for in-network covered services. Generally this amount includes the deductible, co-insurance, and copayments. The range of out-of-pocket maximums shown represents the different individual out-of-pocket maximum options available for the particular plans available under that product. Family out-of-pocket maximums are not represented at this time.</p>" +
                        "<p>This definition may vary from plan to plan. For example, in some plans the in-network out-of-pocket limit doesn't include cost-sharing for all services, such as prescription drugs. This means there may be no upper limit on the amount your employees have to pay for prescription drugs. Plans may have different out-of-pocket limits for different services.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Annual-In-Network-Deductible") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Annual Deductible Options',
                        html: 'true',
                        content:
                        "<p>An annual deductible is the amount an employee must pay each year for covered services before your insurer begins to pay. Insurers apply and structure deductibles differently. For example, under one plan a single deductible might apply to all covered services, while another plan might have separate deductibles for different services (such as prescription drug coverage). The range of deductibles shown represents the different individual deductible options available for the particular plans available under that product. Family deductibles are not represented at this time.</p>" +
                        "<p>With some plans, the cost of certain services, including out-of-network services, may not be applied to the deductible. For those services, the amount employees pay will not count towards the deductible, making their total costs higher. It's important to know which costs count towards the deductible. You will need to read the plan to learn more.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });

                } else if (elementId.indexOf("Available-Deductibles") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Annual Deductible Options',
                        html: 'true',
                        content:
                        "<p>An annual deductible is the amount an employee must pay each year for covered services before your insurer begins to pay. Insurers apply and structure deductibles differently. For example, under one plan a single deductible might apply to all covered services, while another plan might have separate deductibles for different services (such as prescription drug coverage). The range of deductibles shown represents the different individual deductible options available for the particular plans available under that product. Family deductibles are not represented at this time.</p>" +
                        "<p>With some plans, the cost of certain services, including out-of-network services, may not be applied to the deductible. For those services, the amount employees pay will not count towards the deductible, making their total costs higher. It's important to know which costs count towards the deductible. You will need to read the plan to learn more.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });

                } else if (elementId.indexOf("Range-of-Copay") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Range of Copay Options',
                        html: 'true',
                        content:
                        "<p>A copay is the flat dollar amount that a patient must pay when visiting an in-network primary care physician. The range of primary care physician office visit copays shown represents the different options available for the particular plans available under that product.</p>" +
                        "<p>If only one number is displayed, this product has only one copay option available.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Range-of-Co-insurance") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Range of Co-insurance Options',
                        html: 'true',
                        content:
                        "<p>Co-insurance is a cost-sharing agreement where employees pay a certain percentage of medical costs for a certain medical expense after their deductible has been met. The range of co-insurance percentages shown represents the different options available for the particular plans available under that product.</p>" +
                        "<p>If only one number is displayed, this product has only one co-insurance option available.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });

                } else if (elementId.indexOf("Health-Savings-Account") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Health Savings Account (HSA) Eligible',
                        html: 'true',
                        content:
                        "<p>An HSA is a feature of some insurance plans that lets employees set aside money on a tax-free basis, which they can spend on certain qualified out-of-pocket medical expenses. A plan may be HSA-eligible if the enrollee is covered under a qualified high deductible health plan (HDHP). An HDHP has a minimum annual deductible and a maximum out-of-pocket requirement. The minimum deductible and maximum out-of-pocket levels, along with the maximum allowable annual contribution to an HSA, are determined annually by the Internal Revenue Service (IRS). An HSA/HDHP may provide preventive care benefits without a deductible or with a deductible below the minimum annual deductible.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Average-Cost-Per-Enrollee") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Average Cost Per Enrollee',
                        html: 'true',
                        content:
                         "<p>The estimated average cost per enrollee per month. The average cost per enrollee may be lower or higher than the actual premium paid because this figure represents the total written premium for this product divided by total enrollment. The actual cost will vary depending on several factors, including: the specific plan chosen within this product; the demographics of the group; the cost-sharing options chosen such as deductible and out-of-pocket maximum levels; and whether the employee is purchasing the plan for self-only or as family coverage.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Doctor-Choice") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Doctor Choice',
                        html: 'true',
                        content:
                         "<p>There are generally five types of health care plans that are available to choose from. These include:</p>" +
                         "<p><b>Indemnity</b> - The insurer does not have a network of providers that it contracts with. You will receive covered benefits from any doctor you choose.</p>" +
                         "<p><b>HMO (Health Maintenance Organization)</b> - Covered benefits can be provided only by the plan's network of providers, except in emergencies.</p>" +
                         "<p><b>EPO (Exclusive Provider Option) </b> - Similar to an HMO, covered benefits can be provided only by the plan's network of providers.</p>" +
                         "<p><b>POS (Point of Service)</b> - A type of plan in which you pay less if you use doctors, hospitals, and other health care providers that belong to the plan's network. POS plans may require you to get a referral from your primary care doctor in order to see a specialist.</p>" +
                         "<p><b>PPO (Preferred Provider Organization)</b> - Allows you to choose to receive care from network providers or out-of-network providers. Typically you will pay more for the out-of-network care.</p>" +
                         "<p>Different plans have different rules about which doctors or hospitals they will pay for you to use. If there is a doctor or hospital that you prefer to use, you should find out whether your doctor or hospital is in the plan's network, and if not, how these rules affect you.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Included-Benefits") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Included Benefits',
                        html: 'true',
                        content:
                         "<p>A benefit for which the insurer pays either through first-dollar coverage or in combination with cost-sharing (such as a copay, co-insurance, or deductible).</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Excluded-Benefits") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Excluded Benefits',
                        html: 'true',
                        content:
                         "<p>A benefit that is not covered by the particular product offered which requires the subscriber to pay the full cost of the services out-of-pocket.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Limited-Benefits") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Limited Benefits',
                        html: 'true',
                        content:
                         "<p>A benefit that is restricted in some way. For example, it may require a waiting period, have a separate deductible, have a benefit cap, or be limited to certain circumstances (for example, if acupuncture is covered only as an alternative to anesthesia).</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Benefit-Available-for-Purchase") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Benefit Available for Purchase at Additional Cost',
                        html: 'true',
                        content:
                         "<p>A benefit that is available as an option at additional cost. This extra coverage is commonly referred to as an “optional rider.”.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Estimated-Monthly-Base-Rate") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Estimated Monthly Base Rate',
                        html: 'true',
                        content:
                         "<p>The starting price quoted by the insurance company for the monthly premium you would pay for health insurance, whether you use medical services or not. This estimate is based on the information that you provided earlier: zip code, sex, age, and the number of people in your family.</p>" +
                         "<p>Your actual premium may be higher than the estimated monthly base rate shown here, based on your health and pre-existing conditions.</p>",
                        trigger: "hover focus",
                        toggle: "popover"                        
                    });
                } else if (elementId.indexOf("Annual-Deductible-For-Plan") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Annual Deductible',
                        html: 'true',
                        content:
                         "<p>The amount you must pay each year for covered services before your insurer begins to pay. Insurers apply and structure deductibles differently. For example, under one plan, a single deductible might apply to all covered services while another plan might have separate deductibles for different covered services such as prescription drug coverage.</p>" +
                         "<p>The cost of some services, including out-of-network services, may not be applied to the deductible. For those services, the amount you pay will not count towards the deductible, making your overall costs higher. It's important to know which costs count or don't count towards the deductible. You will need to read the plan to learn more.</p>",
                        trigger: "hover focus",
                        toggle: "popover"                        
                    });
                } else if (elementId.indexOf("Denied-Applications") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'How many applications are denied?',
                        html: 'true',
                        content:
                         "<p>This is the percentage of applications submitted for an insurance policy over the time period reported and were denied.</p>" +
                         "<p>Insurers do not have to sell policies to everybody. They may or may not decide to sell one to you based on your health condition, medical history, or even your job.</p>" +
                         "<p style='background-color: #fffbbf;padding: 10px;margin: 20px 0px 0px;'><img alt='' class='modal-image' src='/img/new_note.gif?1371610657'>" +
                         "Under the Affordable Care Act, as of September 2010, insurers can't turn children down because of a pre-existing condition, in any state. Starting in 2014, these same plans won't be able to turn down anyone who has a pre-existing condition, in any state.</p>",
                        toggle: "popover",
                        trigger: "hover focus"
                    });
                } else if (elementId.indexOf("More-Charged") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'You may be charged more',
                        html: 'true',
                        content:
                         "<p>Actual cost of coverage may be higher than this estimated base rate. Insurers can charge more than the estimate you see here, based on your health status or other factors.</p>" +
                         "<p>A \"surcharged quote\" is a premium quote that has been adjusted to cost more, based on the applicant's health status.</p>" +
                         "<p>This can make your costs much higher.</p>" +
                         "<p style='background-color: #fffbbf;padding: 10px;margin: 20px 0px 0px;'><img alt='' class='modal-image' src='/img/new_note.gif?1371610657'/>" +
                         "Under the Affordable Care Act, starting in 2014, insurers won't be allowed to charge higher premiums based on health status in any state. They also won't be allowed to charge you a higher premium based on your sex, and there will be limits on how much premiums can vary based on age.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Prescription-Drugs") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Prescription Drugs',
                        html: 'true',
                        content:
                         "<p class='popover-bluebar'>What you will pay will vary as you move from generic to brand to non-formulary drugs. There may also be different utilization management rules such as step therapies and prior-authorization as the prescriptions become more expensive.</p>" +
                         "<p class='popover-bluebar'>A formulary is a list of drugs that your insurance plan covers. It may include how much you pay for each drug (If the plan uses \"tiers,\" the formulary may list which drugs are in which tiers). Formularies may include both generic drugs and brand-name drugs.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Generic-Drugs") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Generic Drugs',
                        html: 'true',
                        content:
                         "<p>A generic drug is a medicine that is the same as a brand-name drug. It has the same dosage, strength, quality, performance, safety, and intended use.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Non-formulary-Drugs") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Non-formulary Drugs',
                        html: 'true',
                        content:
                         "<p>Also known as \"Tier 3\" drugs, non-formulary drugs can be prescribed and dispensed, but at a greater cost to you.</p>" +
                         "<p>If your provider can establish that a non-formulary drug is medically necessary for you, your insurance company may cover more of the cost of the drug.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Brand-Drugs") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Brand-Drugs',
                        html: 'true',
                        content:
                         "<p>Brand name drugs are medicines that are produced and supplied by a single company. They are patent protected and marketed under the company's brand name.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Formulary") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Formulary',
                        html: 'true',
                        content:
                         "<p>A formulary is a list of drugs that your insurance plan covers. It may include how much you pay for each drug (If the plan uses \"tiers,\" the formulary may list which drugs are in which tiers). Formularies may include both generic drugs and brand-name drugs.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                } else if (elementId.indexOf("Advance-Premium-Tax-Credit") > -1) {

                    $('.contextualHelp[data-name="' + elementId + '"]').popover({
                        autoReposition: true,
                        title: 'Advanced Premium Tax Credit',
                        html: 'true',
                        content:
                         "<p>The Affordable Care Act provides a new tax credit to help you afford health coverage purchased through the Marketplace. Advance payments of the tax credit can be used right away to lower your monthly premium costs. If you qualify, you may choose how much advance credit payments to apply to your premiums each month, up to a maximum amount. If the amount of advance credit payments you get for the year is less than the tax credit you're due, you'll get the difference as a refundable credit when you file your federal income tax return. If your advance payments for the year are more than the amount of your credit, you must repay the excess advance payments with your tax return. Also called premium tax credit.</p>",
                        trigger: "hover focus",
                        toggle: "popover"
                    });
                }
            }

        };

        return Glossary;
    });
