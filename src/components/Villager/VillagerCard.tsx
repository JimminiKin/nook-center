import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import {ucfirst, getGenderEmoji, getZodiacEmoji} from '@modules/utils';
import {FullVillager} from '@src/types';
import useTranslation from '@hooks/useTranslation';

const CampsiteProbability = dynamic(() => import('@components/Villager/CampsiteProbability'), {ssr: false});
const IslandProbability = dynamic(() => import('@components/Villager/IslandProbability'), {ssr: false});
const VillagerStateToggles = dynamic(() => import('@components/Villager/VillagerStateToggles'), {ssr: false});

const VillagerCard: React.FC<{
	villager: FullVillager;
	villagers: {[key: string]: FullVillager};
}> = ({villager, villagers}) => {
	const {locale, t} = useTranslation();
	return (
		<li className="bg-white rounded-lg overflow-hidden border-gray-300 border-2 m-2" style={{width: '20rem'}}>
			<div className="items-center flex justify-between p-4">
				<Link href="/[lang]/villager/[id]" as={`/${locale}/villager/${villager.id}`} prefetch={false}>
					<a className="block cursor-pointer ml-auto mr-auto relative">
						<img
							loading="lazy"
							width="110"
							height="110"
							style={{width: '110px', height: '110px'}}
							src={villager.iconImage}
							alt={`Picture of ${villager.name}`}
						/>
					</a>
				</Link>
				<div className="w-1/2 pl-4 flex flex-col justify-evenly h-36">
					<Link href="/[lang]/villager/[id]" as={`/${locale}/villager/${villager.id}`} prefetch={false}>
						<a>
							<h4 className="text-lg text-green-900 font-semibold pb-2">{villager.name}</h4>
						</a>
					</Link>
					<p>{t(villager.species)}</p>
					<p>{t(villager.personality)}</p>
					<p>
						<span className="tooltip">
							<span className="text-lg mx-2">{getGenderEmoji(villager.gender)}</span>
							<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">{t(villager.gender)}</span>
						</span>
						<span className="tooltip">
							<span className="text-lg mr-2">{getZodiacEmoji(villager.zodiacSign)}</span>
							<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">{t(villager.zodiacSign)}</span>
						</span>
						<span className="ml-1 text-sm">{villager.birthday}</span>
					</p>
				</div>
			</div>
			<div className="h-24">
				<div className="flex justify-evenly">
					<IslandProbability villagerId={villager.id} villagers={villagers} />
					<CampsiteProbability villagerId={villager.id} villagers={villagers} />
				</div>
				<VillagerStateToggles villagerId={villager.id} />
			</div>
		</li>
	);
};

export default VillagerCard;
