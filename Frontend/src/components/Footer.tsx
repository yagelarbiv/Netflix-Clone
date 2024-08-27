const FooterItems: string[] = [
	"FAQ",
	"Help Center",
	"Account",
	"Media Center",
	"Investor Relations",
	'Jobs',
	"Ways to Watch",
	"Terms of Use",
	"Privacy",
	"Cookie Preferences",
	"Corporate Information",
	"Contact Us",
	"Speed Test",
	"Legal Guarantee",
]
const Footer = () => {
	const footer = localStorage.getItem("footer")?.toString();
	const [theme, text] = JSON.stringify(footer || "{}"); // returns an empty array if footer is null
  return (
		<footer className={`flex flex-col w-full min-h-80 md:px-8 md:py-0 bg-${theme} text-${text} border-gray-800`}>
		<div className="h-screen items-center mt-10 justify-between gap-4 md:h-24 md:flex-row">
			<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
				Built by{" "}
				<a
					href="https://github.com/yagelarbiv"
					target="_blank"
					rel="noopener noreferrer"
					className="font-medium underline underline-offset-4"
				>
					Yagel & Avi
				</a>
				. The source code is available on{" "}
				<a
					href="https://github.com/yagelarbiv"
					target="_blank"
					rel="noopener noreferrer"
					className="font-medium underline underline-offset-4"
				>
					GitHub
				</a>
				.
			</p>
		<div>
			<div>
				<p className=" underline mb-5" >Questions? Contact us.</p>
			</div>
		<ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{FooterItems.map((item, index) => (
				<li key={index}>
					<a href="#" className=" underline">
						{item}
					</a>
				</li>
			))}
		</ul>
		</div>
		</div>
		</footer>
  );
};

export default Footer;
