import { useState } from 'react'
import SignUpNavbar from '../components/SignUpNavbar';
import { Link, useNavigate } from 'react-router-dom';

const PlanPage = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>('Premium');

    const plans = [
        {
            name: 'Basic',
            price: '$6.99',
            quality: 'Good',
            resolution: '720p (HD)',
            devices: 'TV, computer, mobile phone, tablet',
            watch: 1,
            download: 1,
            gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
            resolutionLabel: '720p',
        },
        {
            name: 'Standard',
            price: '$15.49',
            quality: 'Great',
            resolution: '1080p (Full HD)',
            devices: 'TV, computer, mobile phone, tablet',
            watch: 2,
            download: 2,
            gradient: 'bg-gradient-to-r from-purple-600 to-red-600',
            resolutionLabel: '1080p',
        },
        {
            name: 'Premium',
            price: '$22.99',
            quality: 'Best',
            resolution: '4K (Ultra HD) + HDR',
            devices: 'TV, computer, mobile phone, tablet',
            watch: 4,
            download: 6,
            gradient: 'bg-gradient-to-r from-red-600 to-purple-600',
            resolutionLabel: '4K + HDR',
            mostPopular: true,
        },
    ];


    const navigate = useNavigate();

    const handleNext = () => {
        const selected = plans.find((plan) => plan.name === selectedPlan);
        if (selected) {
            sessionStorage.setItem('selectedPlanName', selected.name);
            sessionStorage.setItem('selectedPlanPrice', selected.price);
        }
        navigate('/paymentpicker');
    };


    return (
        <>
            <SignUpNavbar />

            <div className="min-h-screen bg-white flex flex-col items-center p-8">
                <div className="text-left mr-auto ml-60 mt-5">
                    <h4 className="text-sm text-gray-500">STEP 2 OF 3</h4>
                    <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mt-2">
                        Choose the plan that's right for you
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 max-w-6xl w-full">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            onClick={() => setSelectedPlan(plan.name)}
                            className={`w-full md:w-1/3 cursor-pointer bg-white border-2 rounded-2xl p-6 flex flex-col justify-between shadow-md transition-transform transform ${selectedPlan === plan.name
                                ? 'border-red-500 scale-105'
                                : 'border-gray-300'
                                } relative min-h-[600px]`}
                        >
                            {plan.mostPopular && (
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                                    Most Popular
                                </div>
                            )}
                            <div
                                className={`text-left text-white ${plan.gradient} rounded-xl p-4`}
                            >
                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <p className="text-sm mt-1">{plan.resolutionLabel}</p>
                            </div>

                            <ul className="text-sm text-gray-700 mt-6 space-y-3 flex-1">

                                <li>Monthly price <br /> {plan.price}</li>

                                <hr />
                                <li>
                                    Video and sound quality <br /> {' '}
                                    <span className="font-medium">{plan.quality}</span>
                                </li>

                                <hr />
                                <li>Resolution <br /> {plan.resolution}</li>

                                <hr />
                                <li>Supported devices <br />  {plan.devices}</li>

                                <hr />
                                <li>
                                    Devices your household can watch at the same time <br />  {plan.watch}
                                </li>

                                <hr />
                                <li>Download devices <br />  {plan.download}</li>
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='mt-10 text-sm'>
                    <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <br />
                        <Link to='' className='text-blue-700'>Terms of Use</Link>  for more details.<br /><br />

                        Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
                    </p>
                </div>


                <button
                     onClick={handleNext} className="w-96 h-14 mt-12 bg-red-600 text-white text-lg font-semibold py-3 px-12 rounded-md hover:bg-red-700 transition"
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default PlanPage