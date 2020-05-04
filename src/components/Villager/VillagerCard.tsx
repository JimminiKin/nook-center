import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import {ucfirst, getGenderEmoji, getZodiacEmoji} from '@modules/utils';

const CampsiteProbability = dynamic(() => import('@components/Villager/CampsiteProbability'), {ssr: false});
const IslandProbability = dynamic(() => import('@components/Villager/IslandProbability'), {ssr: false});
const VillagerStateToggles = dynamic(() => import('@components/Villager/VillagerStateToggles'), {ssr: false});

import {VillagerCardFragment} from '@fragment/villagerCard';

const VillagerCard: React.FC<{
	villager: VillagerCardFragment;
}> = ({villager}) => {
	return (
		<li className="bg-white rounded-lg overflow-hidden border-gray-600 ">
			<div className="items-center flex justify-between p-4">
				<Link href="/villager/[id]" as={`/villager/${villager.id}`} prefetch={false}>
					<a className="block w-1/2 h-48 cursor-pointer ml-auto mr-auto relative">
						<img
							loading="lazy"
							className="absolute m-auto top-0 left-0 right-0 bottom-0"
							style={{objectFit: 'contain'}}
							src={villager.picture.medium}
							alt={`Picture of ${villager.name}`}
						/>
					</a>
				</Link>
				<div className="w-1/2 pl-4 flex flex-col justify-evenly h-48">
					<Link href="/villager/[id]" as={`/villager/${villager.id}`} prefetch={false}>
						<a>
							<h4 className="text-lg text-green-900 font-semibold pb-2">{villager.name}</h4>
						</a>
					</Link>
					<p>
						{ucfirst(villager.species)} |{' '}
						<span className="tooltip">
							{getGenderEmoji(villager.gender)}
							<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">{ucfirst(villager.gender)}</span>
						</span>
					</p>
					<p>{ucfirst(villager.personality)}</p>
					<p>
						<span className="tooltip">
							<span className="text-lg">{getZodiacEmoji(villager.starSign)}</span>
							<span className="tooltip-text bg-green-200 rounded -ml-8 -mt-6">{ucfirst(villager.starSign)}</span>
						</span>
						<span className="ml-1 text-sm">{ucfirst(villager.birthday)}</span>
					</p>
					<p>
						<IslandProbability villagerId={villager.id} />
					</p>
					<p>
						<CampsiteProbability villagerId={villager.id} />
					</p>
				</div>
			</div>
			<VillagerStateToggles villagerId={villager.id} />
		</li>
	);
};

export default VillagerCard;
