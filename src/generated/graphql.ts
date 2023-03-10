import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  house_number: Scalars['String'];
  id: Scalars['ID'];
  street: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  zip_code: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  house_number: Scalars['String'];
  street: Scalars['String'];
  zip_code: Scalars['String'];
};

export enum Beneficiary_Type {
  Institution = 'INSTITUTION',
  Person = 'PERSON'
}

export enum Cemetery_Type {
  Catholic = 'CATHOLIC',
  Jewish = 'JEWISH',
  Mixed = 'MIXED',
  Muslim = 'MUSLIM',
  Other = 'OTHER',
  Protestant = 'PROTESTANT'
}

export enum Client_Type {
  Company = 'COMPANY',
  Individual = 'INDIVIDUAL',
  PublicInstution = 'PUBLIC_INSTUTION'
}

export type Client = {
  __typename?: 'Client';
  address: Address;
  addressId: Scalars['String'];
  client_type: Client_Type;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateClientInput = {
  address: AddressInput;
  client_type: Client_Type;
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateRoleInput = {
  name: RoleNames;
};

export enum Invoice_Status {
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  Unpaid = 'UNPAID'
}

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  activateUser: User;
  changeRole: User;
  confirmUser: User;
  createAddress: Address;
  createClient: Client;
  createRole: Role;
  createUser: User;
  signIn: Token;
  updateAddress: Address;
};


export type MutationActivateUserArgs = {
  id: Scalars['ID'];
};


export type MutationChangeRoleArgs = {
  id: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationConfirmUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAddressArgs = {
  input: AddressInput;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationUpdateAddressArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  address: Address;
  addresses: Array<Address>;
  client: Client;
  clients: Array<Client>;
  me?: Maybe<User>;
  role: Role;
  roles: Array<Role>;
  user: User;
  users: Array<User>;
};


export type QueryAddressArgs = {
  id: Scalars['ID'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: RoleNames;
  updatedAt: Scalars['DateTime'];
};

export enum RoleNames {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Moderator = 'MODERATOR',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export enum Sex_Type {
  Diverse = 'DIVERSE',
  Female = 'FEMALE',
  Male = 'MALE'
}

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  expires: Scalars['String'];
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  client: Client;
  clientId: Scalars['ID'];
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
  roleId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type CreateUserInput = {
  clientId: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  roleId: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
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
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  BENEFICIARY_TYPE: Beneficiary_Type;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CEMETERY_TYPE: Cemetery_Type;
  CLIENT_TYPE: Client_Type;
  Client: ResolverTypeWrapper<Client>;
  CreateClientInput: CreateClientInput;
  CreateRoleInput: CreateRoleInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  INVOICE_STATUS: Invoice_Status;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  RoleNames: RoleNames;
  SEX_TYPE: Sex_Type;
  SignInInput: SignInInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<Token>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  createUserInput: CreateUserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean'];
  Client: Client;
  CreateClientInput: CreateClientInput;
  CreateRoleInput: CreateRoleInput;
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  Role: Role;
  SignInInput: SignInInput;
  String: Scalars['String'];
  Token: Token;
  Upload: Scalars['Upload'];
  User: User;
  createUserInput: CreateUserInput;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  house_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  zip_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  addressId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client_type?: Resolver<ResolversTypes['CLIENT_TYPE'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  activateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationActivateUserArgs, 'id'>>;
  changeRole?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationChangeRoleArgs, 'id' | 'roleId'>>;
  confirmUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationConfirmUserArgs, 'id'>>;
  createAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'input'>>;
  createClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationCreateClientArgs, 'input'>>;
  createRole?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  signIn?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  updateAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryAddressArgs, 'id'>>;
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<QueryClientArgs, 'id'>>;
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['RoleNames'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  expires?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  clientId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

