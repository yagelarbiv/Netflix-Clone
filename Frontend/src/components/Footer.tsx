// const FooterItems: string[] = [
// 	"FAQ",
// 	"Help Center",
// 	"Account",
// 	"Media Center",
// 	"Investor Relations",
// 	'Jobs',
// 	"Ways to Watch",
// 	"Terms of Use",
// 	"Privacy",
// 	"Cookie Preferences",
// 	"Corporate Information",
// 	"Contact Us",
// 	"Speed Test",
// 	"Legal Guarantee",
// ]
// const Footer = () => {
// 	const footer = localStorage.getItem("footer")?.toString();
// 	const { theme, text } = JSON.parse(footer || "{}"); // returns an empty array if footer is null
// 	return (
// 		<footer className={`flex flex-col w-full min-h-64 md:px-8 md:py-0 bg-${theme} text-${text} border border-gray-500 bg-gray-200 mt-14`}>
// 			<div className="h-screen items-center mt-4 justify-between gap-4 md:h-24 md:flex-row">
// 				<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-center">
// 					Built by{" "}
// 					<a
// 						href="https://github.com/yagelarbiv"
// 						target="_blank"
// 						rel="noopener noreferrer"
// 						className="font-medium underline underline-offset-4"
// 					>
// 						Yagel & Avi
// 					</a>
// 					. The source code is available on{" "}
// 					<a
// 						href="https://github.com/yagelarbiv"
// 						target="_blank"
// 						rel="noopener noreferrer"
// 						className="font-medium underline underline-offset-4"
// 					>
// 						GitHub
// 					</a>
// 					.
// 				</p>
// 				<div>
// 					<div>
// 						<p className=" underline mb-5" >Questions? Contact us.</p>
// 					</div>
// 					<ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
// 						{FooterItems.map((item, index) => (
// 							<li key={index}>
// 								<a href="#" className=" underline">
// 									{item}
// 								</a>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// export default Footer;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
	return (
		<footer className="bg-gray-100 border-t border-gray-200 py-7">
			<div className="max-w-screen-lg ml-20 px-4 grid gap-6 text-gray-500">
				
				<p><a className="text-gray-600 text-xs hover:underline" href="">
					Questions? Contact us.
				</a></p>

				<div className="flex flex-col text-xs md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4">
					<ul className="space-y-2">
						<li><a className="text-gray-600 hover:underline" href="">FAQ</a></li>
						<li><a className="text-gray-600 hover:underline" href="">Cookie Preferences</a></li>
					</ul>

					<ul className="space-y-2">
						<li><a className="text-gray-600 hover:underline" href="">Help Center</a></li>
						<li><a className="text-gray-600 hover:underline" href="">Corporate Information</a></li>
					</ul>

					<ul className="space-y-2">
						<li><a className="text-gray-600 hover:underline" href="">Terms of Use</a></li>
						<li><a className="text-gray-600 hover:underline" href="">Privacy</a></li>
					</ul>
				</div>

				<div className="relative flex items-center">
					<select className="appearance-none cursor-pointer h-12 pl-8 pr-10 text-gray-500 bg-transparent border border-gray-300 rounded" onChange={(e) => window.location.href = e.target.value}>
						<option value="english" selected>English</option>
						<option value="">עברית</option>
					</select>
					<div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
						<FontAwesomeIcon icon={faGlobe} className="text-lg" />
						<FontAwesomeIcon icon={faChevronDown} className="text-lg ml-16" />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer