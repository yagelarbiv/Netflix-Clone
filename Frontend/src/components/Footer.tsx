import { useEffect, useState } from "react";

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
  const [Theme, setTheme] = useState("black");
  const [Text, setText] = useState("white");

  useEffect(() => {
    if (footer) {
      try {
        const parsedFooter = JSON.parse(footer);
				console.log(Object.keys(parsedFooter).length === 2)
        if (Object.keys(parsedFooter).length === 2) {
          setTheme("white");
          setText("black");
        } else {
          console.error("Footer data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error parsing footer data:", error);
      }
    }
		else{
			setTheme("black");
      setText("white");
		}
  }, [footer]);
  return (
		<footer className={`flex flex-col w-full min-h-80 md:px-8 md:py-0 bg-${Theme} text-${Text} border-gray-800`}>
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
			<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
			>
				This product uses the TMDB API but is not endorsed or certified by{" "}
				<img
				className="inline-block h-10 w-10" 
				src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB logo" />
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
