import {GraphQLResolveInfo} from 'graphql';
import {DeepPartial} from 'utility-types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {[X in Exclude<keyof T, K>]?: T[X]} & {[P in K]-?: NonNullable<T[P]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export enum Gender {
	Male = 'MALE',
	Female = 'FEMALE',
}

export type Island = {
	__typename?: 'Island';
	id: Scalars['ID'];
	name: Scalars['String'];
	picture: Scalars['String'];
	maxOneDailyVisit: Scalars['Boolean'];
	probability: Scalars['Float'];
	requirements?: Maybe<Scalars['String']>;
	description: Scalars['String'];
	trees: Scalars['String'];
	treesBadSpecial: Scalars['Boolean'];
	treesGoodSpecial: Scalars['Boolean'];
	flowers: Scalars['String'];
	flowersBadSpecial: Scalars['Boolean'];
	flowersGoodSpecial: Scalars['Boolean'];
	rocks: Scalars['String'];
	rocksBadSpecial: Scalars['Boolean'];
	rocksGoodSpecial: Scalars['Boolean'];
	insects: Scalars['String'];
	insectsBadSpecial: Scalars['Boolean'];
	insectsGoodSpecial: Scalars['Boolean'];
	fishes: Scalars['String'];
	fishesBadSpecial: Scalars['Boolean'];
	fishesGoodSpecial: Scalars['Boolean'];
};

export type IslandSearchInput = {
	treesBadSpecial?: Maybe<Scalars['Boolean']>;
	treesGoodSpecial?: Maybe<Scalars['Boolean']>;
	flowersBadSpecial?: Maybe<Scalars['Boolean']>;
	flowersGoodSpecial?: Maybe<Scalars['Boolean']>;
	rocksBadSpecial?: Maybe<Scalars['Boolean']>;
	rocksGoodSpecial?: Maybe<Scalars['Boolean']>;
	insectsBadSpecial?: Maybe<Scalars['Boolean']>;
	insectsGoodSpecial?: Maybe<Scalars['Boolean']>;
	fishesBadSpecial?: Maybe<Scalars['Boolean']>;
	fishesGoodSpecial?: Maybe<Scalars['Boolean']>;
};

export type Node = {
	id: Scalars['ID'];
};

export type PageInfo = {
	__typename?: 'PageInfo';
	hasNextPage: Scalars['Boolean'];
	hasPreviousPage: Scalars['Boolean'];
	startCursor?: Maybe<Scalars['String']>;
	endCursor?: Maybe<Scalars['String']>;
	count: Scalars['Int'];
};

export enum Personality {
	Cranky = 'CRANKY',
	Jock = 'JOCK',
	Lazy = 'LAZY',
	Normal = 'NORMAL',
	Peppy = 'PEPPY',
	Sisterly = 'SISTERLY',
	Smug = 'SMUG',
	Snooty = 'SNOOTY',
}

export type Picture = {
	__typename?: 'Picture';
	thumb: Scalars['String'];
	medium: Scalars['String'];
	full: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	villager?: Maybe<Villager>;
	villagers: VillagersResultConnection;
	island?: Maybe<Island>;
	islands: Array<Island>;
};

export type QueryVillagerArgs = {
	villagerId: Scalars['ID'];
};

export type QueryVillagersArgs = {
	start?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	search?: Maybe<VillagerSearchInput>;
};

export type QueryIslandArgs = {
	islandId: Scalars['ID'];
};

export type QueryIslandsArgs = {
	search: IslandSearchInput;
};

export enum RelationshipQuality {
	Like = 'LIKE',
	Neutral = 'NEUTRAL',
	Dislike = 'DISLIKE',
}

export enum Species {
	Alligator = 'ALLIGATOR',
	Anteater = 'ANTEATER',
	Bear = 'BEAR',
	Bird = 'BIRD',
	Bull = 'BULL',
	Cat = 'CAT',
	Chicken = 'CHICKEN',
	Cow = 'COW',
	Cub = 'CUB',
	Deer = 'DEER',
	Dog = 'DOG',
	Duck = 'DUCK',
	Eagle = 'EAGLE',
	Elephant = 'ELEPHANT',
	Frog = 'FROG',
	Goat = 'GOAT',
	Gorilla = 'GORILLA',
	Hamster = 'HAMSTER',
	Hippo = 'HIPPO',
	Kangaroo = 'KANGAROO',
	Koala = 'KOALA',
	Lion = 'LION',
	Monkey = 'MONKEY',
	Mouse = 'MOUSE',
	Octopus = 'OCTOPUS',
	Ostrich = 'OSTRICH',
	Penguin = 'PENGUIN',
	Rabbit = 'RABBIT',
	Rhino = 'RHINO',
	Sheep = 'SHEEP',
	Pig = 'PIG',
	Squirrel = 'SQUIRREL',
	Wolf = 'WOLF',
	Horse = 'HORSE',
	Tiger = 'TIGER',
}

export enum StarSign {
	Aquarius = 'AQUARIUS',
	Pisces = 'PISCES',
	Aries = 'ARIES',
	Taurus = 'TAURUS',
	Gemini = 'GEMINI',
	Cancer = 'CANCER',
	Virgo = 'VIRGO',
	Libra = 'LIBRA',
	Scorpio = 'SCORPIO',
	Sagittarius = 'SAGITTARIUS',
	Capricorn = 'CAPRICORN',
	Leo = 'LEO',
}

export type Villager = Node & {
	__typename?: 'Villager';
	id: Scalars['ID'];
	name: Scalars['String'];
	gender: Gender;
	picture?: Maybe<Picture>;
	nookiPediaPage: Scalars['String'];
	species: Species;
	personality: Personality;
	starSign: StarSign;
	birthday: Scalars['String'];
	description: Scalars['String'];
	saying: Scalars['String'];
	islandProbability: Scalars['Float'];
	campsiteProbability: Scalars['Float'];
	getsAlong: Array<Maybe<Villager>>;
	translations: VillagerNameTranslations;
};

export type VillagerIslandProbabilityArgs = {
	villageState?: Maybe<VillageStateInput>;
};

export type VillagerCampsiteProbabilityArgs = {
	villageState?: Maybe<VillageStateInput>;
};

export type VillagerNameTranslations = {
	__typename?: 'VillagerNameTranslations';
	japanese?: Maybe<Scalars['String']>;
	japaneseExplanation?: Maybe<Scalars['String']>;
	spanish?: Maybe<Scalars['String']>;
	french?: Maybe<Scalars['String']>;
	german?: Maybe<Scalars['String']>;
	italian?: Maybe<Scalars['String']>;
	dutch?: Maybe<Scalars['String']>;
	korean?: Maybe<Scalars['String']>;
	koreanExplanation?: Maybe<Scalars['String']>;
	russian?: Maybe<Scalars['String']>;
	chinese?: Maybe<Scalars['String']>;
};

export type VillagerSearchInput = {
	text?: Maybe<Scalars['String']>;
	personality?: Maybe<Personality>;
	species?: Maybe<Species>;
	gender?: Maybe<Gender>;
	starSign?: Maybe<StarSign>;
};

export type VillagersResultConnection = {
	__typename?: 'VillagersResultConnection';
	edges: Array<VillagersResultEdge>;
	pageInfo: PageInfo;
};

export type VillagersResultEdge = {
	__typename?: 'VillagersResultEdge';
	cursor: Scalars['String'];
	node: Villager;
};

export type VillageStateInput = {
	currentVillagers: Array<Scalars['ID']>;
	pastVillagers: Array<Scalars['ID']>;
	pastCampers: Array<Scalars['ID']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{[key in TKey]: TResult}, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, {[key in TKey]: TResult}, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
	Query: ResolverTypeWrapper<{}>;
	ID: ResolverTypeWrapper<DeepPartial<Scalars['ID']>>;
	Villager: ResolverTypeWrapper<DeepPartial<Villager>>;
	Node: ResolversTypes['Villager'];
	String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
	Gender: ResolverTypeWrapper<DeepPartial<Gender>>;
	Picture: ResolverTypeWrapper<DeepPartial<Picture>>;
	Species: ResolverTypeWrapper<DeepPartial<Species>>;
	Personality: ResolverTypeWrapper<DeepPartial<Personality>>;
	StarSign: ResolverTypeWrapper<DeepPartial<StarSign>>;
	VillageStateInput: ResolverTypeWrapper<DeepPartial<VillageStateInput>>;
	Float: ResolverTypeWrapper<DeepPartial<Scalars['Float']>>;
	VillagerNameTranslations: ResolverTypeWrapper<DeepPartial<VillagerNameTranslations>>;
	Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
	VillagerSearchInput: ResolverTypeWrapper<DeepPartial<VillagerSearchInput>>;
	VillagersResultConnection: ResolverTypeWrapper<DeepPartial<VillagersResultConnection>>;
	VillagersResultEdge: ResolverTypeWrapper<DeepPartial<VillagersResultEdge>>;
	PageInfo: ResolverTypeWrapper<DeepPartial<PageInfo>>;
	Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
	Island: ResolverTypeWrapper<DeepPartial<Island>>;
	IslandSearchInput: ResolverTypeWrapper<DeepPartial<IslandSearchInput>>;
	RelationshipQuality: ResolverTypeWrapper<DeepPartial<RelationshipQuality>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
	Query: {};
	ID: DeepPartial<Scalars['ID']>;
	Villager: DeepPartial<Villager>;
	Node: ResolversParentTypes['Villager'];
	String: DeepPartial<Scalars['String']>;
	Gender: DeepPartial<Gender>;
	Picture: DeepPartial<Picture>;
	Species: DeepPartial<Species>;
	Personality: DeepPartial<Personality>;
	StarSign: DeepPartial<StarSign>;
	VillageStateInput: DeepPartial<VillageStateInput>;
	Float: DeepPartial<Scalars['Float']>;
	VillagerNameTranslations: DeepPartial<VillagerNameTranslations>;
	Int: DeepPartial<Scalars['Int']>;
	VillagerSearchInput: DeepPartial<VillagerSearchInput>;
	VillagersResultConnection: DeepPartial<VillagersResultConnection>;
	VillagersResultEdge: DeepPartial<VillagersResultEdge>;
	PageInfo: DeepPartial<PageInfo>;
	Boolean: DeepPartial<Scalars['Boolean']>;
	Island: DeepPartial<Island>;
	IslandSearchInput: DeepPartial<IslandSearchInput>;
	RelationshipQuality: DeepPartial<RelationshipQuality>;
}>;

export type IslandResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Island'] = ResolversParentTypes['Island']
> = ResolversObject<{
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	maxOneDailyVisit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	probability?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
	requirements?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	trees?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	treesBadSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	treesGoodSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	flowers?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	flowersBadSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	flowersGoodSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	rocks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	rocksBadSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	rocksGoodSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	insects?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	insectsBadSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	insectsGoodSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	fishes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	fishesBadSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	fishesGoodSpecial?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NodeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = ResolversObject<{
	__resolveType: TypeResolveFn<'Villager', ParentType, ContextType>;
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
	hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
	startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PictureResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Picture'] = ResolversParentTypes['Picture']
> = ResolversObject<{
	thumb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	medium?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	full?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
	villager?: Resolver<
		Maybe<ResolversTypes['Villager']>,
		ParentType,
		ContextType,
		RequireFields<QueryVillagerArgs, 'villagerId'>
	>;
	villagers?: Resolver<
		ResolversTypes['VillagersResultConnection'],
		ParentType,
		ContextType,
		RequireFields<QueryVillagersArgs, 'start' | 'after' | 'search'>
	>;
	island?: Resolver<
		Maybe<ResolversTypes['Island']>,
		ParentType,
		ContextType,
		RequireFields<QueryIslandArgs, 'islandId'>
	>;
	islands?: Resolver<
		Array<ResolversTypes['Island']>,
		ParentType,
		ContextType,
		RequireFields<QueryIslandsArgs, 'search'>
	>;
}>;

export type VillagerResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Villager'] = ResolversParentTypes['Villager']
> = ResolversObject<{
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
	picture?: Resolver<Maybe<ResolversTypes['Picture']>, ParentType, ContextType>;
	nookiPediaPage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	species?: Resolver<ResolversTypes['Species'], ParentType, ContextType>;
	personality?: Resolver<ResolversTypes['Personality'], ParentType, ContextType>;
	starSign?: Resolver<ResolversTypes['StarSign'], ParentType, ContextType>;
	birthday?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	saying?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	islandProbability?: Resolver<
		ResolversTypes['Float'],
		ParentType,
		ContextType,
		RequireFields<VillagerIslandProbabilityArgs, never>
	>;
	campsiteProbability?: Resolver<
		ResolversTypes['Float'],
		ParentType,
		ContextType,
		RequireFields<VillagerCampsiteProbabilityArgs, never>
	>;
	getsAlong?: Resolver<Array<Maybe<ResolversTypes['Villager']>>, ParentType, ContextType>;
	translations?: Resolver<ResolversTypes['VillagerNameTranslations'], ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type VillagerNameTranslationsResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['VillagerNameTranslations'] = ResolversParentTypes['VillagerNameTranslations']
> = ResolversObject<{
	japanese?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	japaneseExplanation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	spanish?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	french?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	german?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	italian?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	dutch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	korean?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	koreanExplanation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	russian?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	chinese?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type VillagersResultConnectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['VillagersResultConnection'] = ResolversParentTypes['VillagersResultConnection']
> = ResolversObject<{
	edges?: Resolver<Array<ResolversTypes['VillagersResultEdge']>, ParentType, ContextType>;
	pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type VillagersResultEdgeResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['VillagersResultEdge'] = ResolversParentTypes['VillagersResultEdge']
> = ResolversObject<{
	cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	node?: Resolver<ResolversTypes['Villager'], ParentType, ContextType>;
	__isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
	Island?: IslandResolvers<ContextType>;
	Node?: NodeResolvers;
	PageInfo?: PageInfoResolvers<ContextType>;
	Picture?: PictureResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Villager?: VillagerResolvers<ContextType>;
	VillagerNameTranslations?: VillagerNameTranslationsResolvers<ContextType>;
	VillagersResultConnection?: VillagersResultConnectionResolvers<ContextType>;
	VillagersResultEdge?: VillagersResultEdgeResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
