import React from 'react';
import Head from 'next/head';
import Layout from '@components/App/Layout';
import withLocale from '@hocs/withLocale';
import {locales} from '../../translations/config';

export const getStaticPaths = () => {
	return {
		paths: locales.map((l) => `/${l}/hunting`),
		fallback: false,
	};
};

export const getStaticProps = ({params}) => {
	return {
		props: {
			locale: params.lang,
		},
	};
};
const Hunting: React.FC = () => {
	return (
		<Layout>
			<Head>
				<title>Hunting - Nook Center</title>
			</Head>
			<div className="p-4">
				<h1 className="text-green-900 font-bold text-5xl text-center">Villager Hunting</h1>
				<p className="p-4 mt-4 text-xl">
					Two main methods can be used to hunt villager, wether you're time traveling or not :
				</p>
				<ul className="p-4 py-2 mx-8 -my-2 text-xl list-disc">
					<li>Mystery Island method : slow, no probability manipulation possible, need to get those miles tickets</li>
					<li>
						Campsite Rolling method : still slow, but probability can be much more manipulated, making it much easier
					</li>
				</ul>
				<p className="p-4 text-xl">
					Obviously time traveling will help but percentages presented by this website should still hold true if you're
					not a filthy cheater. In my example, using the campsite rolling method, I was able to get Julian after 35
					campsites, which means at least 35 weeks, in game time. With time traveling, this means at least 100 time
					jumps, so more or less 20 hours. Without TT, this means at least .... 35 real life weeks ! Your mileage may
					vary.
				</p>
				<section>
					<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg my-4">
						Mystery Island Method
					</h2>
					<p className="p-4 text-xl">
						Probability of a specific villager spawning on a mystery island seems to only be driven by the number of
						villager with the same species that are not currently in your village.
					</p>
					<p className="p-4 text-xl">Villager selection on an island should follow this process :</p>
					<ul className="p-4 py-2 mx-8 -my-2 text-xl list-disc">
						<li>First, game will pick the species of the villager : 1 out of 35.</li>
						<li>Second, game will pick a villager in the selected species.</li>
					</ul>
					<p className="p-4 text-xl">
						This means you have the same probability to have AN octopus or a cat, BUT the probability to have a specific
						octopus (only 3 possible) will be much higher than the one to get a specific cat (23 possible).
					</p>
					<p className="p-4 text-xl">
						To have villagers spawn on a mystery island, you have to have an empty spot on your island, or a spot for
						sale. If you need to get rid of a current villager beforehand, you'll need to ignore them fo a while (at
						least 15 days apparently). For more information on how to kick a villager, you can watch{' '}
						<a href="https://www.youtube.com/watch?v=AasUEUGerZA" target="_blank" rel="noopener" className="font-bold">
							this video
						</a>{' '}
						from{' '}
						<a
							href="https://www.youtube.com/channel/UCXbYdeldt9XqrXBB1kl00Mg"
							target="_blank"
							rel="noopener"
							className="font-bold"
						>
							TagBackTV
						</a>
						.
					</p>
					<p className="p-4 text-xl">
						Note: You can't get one of your current villager on a mystery island, so, if you have two octopus villagers,
						you end up with a 1 out of 35 chance to have anothed octopus. They seem to really want you to have the full
						octopus family ...
					</p>
				</section>
				<section>
					<h2 className="text-green-900 font-bold text-4xl p-8 bg-green-500 text-center rounded-lg my-4">
						Campsite Rolling Method
					</h2>
					<p className="p-4 text-xl">
						Probability of a specific villager spawning in a campsite is driven mainly by the personality of the
						villager.
					</p>
					<p className="p-4 text-xl">Villager selection in a campsite should follow this process :</p>
					<ul className="p-4 py-2 mx-8 -my-2 text-xl list-disc">
						<li>First, game will pick the personality of the villager, 1 out of 8.</li>
						<li>Second, game will pick a villager with the selected personality.</li>
					</ul>
					<p className="p-4 text-xl">Two facts make this method much easier than mystery island for hunting :</p>
					<ul className="p-4 py-2 mx-8 -my-2 text-xl list-disc">
						<li>
							Any villager that spawns in the campsite will NOT respawn there again before all the same personality
							villagers have spawned (might be all villagers, not only same personality, but not sure yet).
						</li>
						<li>
							If a personality is not currently represented on your island, it will be picked 60% of the time, instead
							of 1 one out of 8. (if two personalities are absent for your island, Nook Center will assume the 60% is
							equally shared between those two)
						</li>
					</ul>
					<p className="p-4 text-xl">
						This means the more you go through campsites, the better your chances to get a villager of the personality
						you want, BUT, for that, you need to get rid of all villagers with the personality of the villager you're
						hunting :)
					</p>
					<p className="p-4 text-xl">
						If you're ready to make this sacrifice, you should be able to pin down your wanted villager in around 20 to
						40 campsites. I for example, got Julian after 35 campsites. My soul is dead after so much time travel, BUT I
						HAVE A UNICORN !!!!! Raymond being a smug, the probability to have him instead of Julian was the same (5% as
						the time of Julian spawning).
					</p>
					<p className="p-4 text-xl">
						Unfortunately, now that the smug personality is represented in my village (by Julian), Raymond probability
						is much lower, BUT, as I went through a lot of smug villagers while hunting, probability is still much
						higher to get Raymond than a specific villager with another personality. In my example (which is the default
						data loaded on the website), Raymond is at 0.52% while all peppy villagers are at 0.12%.
					</p>
					<p className="p-4 text-xl">Now that we talked about the probability, we can get into the method itself.</p>

					<p className="p-4 text-xl">
						To improve your chances, try to kick out of you villager all the villager with the same personality as your
						targeted villager. To learn how to kick out villagers, you can watch{' '}
						<a href="https://www.youtube.com/watch?v=AasUEUGerZA" target="_blank" rel="noopener" className="font-bold">
							this video
						</a>{' '}
						from{' '}
						<a
							href="https://www.youtube.com/channel/UCXbYdeldt9XqrXBB1kl00Mg"
							target="_blank"
							rel="noopener"
							className="font-bold"
						>
							TagBackTV
						</a>
						.
					</p>
					<p className="p-4 text-xl">Once that's done :</p>

					<div className="px-12 py-4">
						<ul className="list-decimal text-xl">
							<li>Open the game</li>
							<li>If Isabelle announces a campsite, go to step 4</li>
							<li>
								If not, finish the annoucement until you spawn in front of your house, quit the game (no need to save),
								TT one day in the future, go back to step 2
							</li>
							<li>
								If the camper is not the villager you want, TT 6 days in the future, this will raise you chance of a
								camper spawning to 20%, the maxium, go back to step 2
							</li>
							<li>
								If it is the villager you want, talk to the camper until he offers to join the island. You might have to
								play card games, this may be long ..
							</li>
							<li>
								Once he tells you he can't join the island because it's full BE CAREFUL, after going through the
								discussion, the camper will end up announcing who he can replace. STOP HERE AND THINK ABOUT IT.
							</li>
							<li>
								If the villager that's targeted for being kicked out is the NOT the one you want to be replace,
								IMMEDIATLY quit the game, DO NOT go thourgh the discussion, restart the game and go to step 5
							</li>
							<li>
								If it is, congratulation, you've got your target in your village. TT to the day after twice in a row, to
								finalize the new villager installation in the village, otherwise you might get into weird issues with
								the house of the new villager being the one of the previous villager.
							</li>
							<li>Pick a new target and got to step 1 ;)</li>
						</ul>
					</div>
					<p className="p-4 text-xl">
						For more information about the specifics of the method, watch{' '}
						<a href="https://www.youtube.com/watch?v=b_Veo5QayUI" target="_blank" rel="noopener" className="font-bold">
							this video
						</a>{' '}
						from{' '}
						<a
							href="https://www.youtube.com/channel/UCXbYdeldt9XqrXBB1kl00Mg"
							target="_blank"
							rel="noopener"
							className="font-bold"
						>
							TagBackTV
						</a>{' '}
						and read{' '}
						<a
							href="https://docs.google.com/document/d/1c8rsKWWtwsOo_JOxwO-lVRx2MUhc-bcdZg1mhXgtRPg/edit#"
							target="_blank"
							rel="noopener"
							className="font-bold"
						>
							this amazing doc
						</a>{' '}
						by{' '}
						<a href="https://www.reddit.com/user/DrJaysAnatomy/" target="_blank" rel="noopener" className="font-bold">
							DrJaysAnatomy
						</a>{' '}
						which is the source of all those informations about probabilties.
					</p>
				</section>
			</div>
		</Layout>
	);
};

export default withLocale(Hunting, {ssr: false});
