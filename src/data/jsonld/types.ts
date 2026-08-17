import type { UrlObject } from 'url';

type Url = string | UrlObject;

interface Person {
	'@type': 'Person';
	name: string;
	[key: string]: any;
}

interface Organization {
	'@type': 'Organization';
	name: string;
	[key: string]: any;
}

interface Place {
	'@type': 'Place';
	name?: string;
	address?: PostalAddress | string;
}

interface Role {
	'@type': 'Role';
	roleName?: string;
	startDate?: string;
	endDate?: string;
	member?: Ref;
}

interface PostalAddress {
	'@type': 'PostalAddress';
	streetAddress?: string;
	addressLocality?: string;
	addressRegion?: string;
	postalCode?: string;
	addressCountry?: string;
}

interface QuantitativeValue {
	'@type': 'QuantitativeValue';
	value: number;
	unitText?: string;
}

interface EducationalOccupationalCredential {
	'@type': 'EducationalOccupationalCredential';
	credentialCategory?: string;
	recognizedBy?: Organization;
}

interface CreativeWork {
	'@type': 'CreativeWork';
	name?: string;
	url?: Url;
}

export interface Event {
	'@type': 'Event';
	'@id': string;
	name: string;
	startDate: string; // ISO 8601
	endDate?: string;
	url?: string;
	description?: string;
	speaker?: Ref | Ref[] | Person | Person[];
	organizer?: Ref | Ref[] | Person | Person[] | EnrichedOrganization | EnrichedOrganization[];
	host?: Ref | Ref[] | Person | Person[] | EnrichedOrganization | EnrichedOrganization[];
	performer?: Ref | Ref[] | Person | Person[] | EnrichedOrganization | EnrichedOrganization[];
	contributor?: Ref | Ref[] | Person | Person[] | EnrichedOrganization | EnrichedOrganization[];
	location?: {
		'@type': 'Place';
		name: string;
		address?: {
			'@type': 'PostalAddress';
			streetAddress?: string;
			addressLocality?: string;
			postalCode?: string;
			addressRegion?: string;
			addressCountry?: string;
		};
	};
	keywords?: string[];
	'x-image'?: string;
}

interface EducationalOccupationalProgram {
	'@type': 'EducationalOccupationalProgram';
	name?: string;
	educationalCredentialAwarded?: string | string[];
}

interface Ref {
	'@id': string;
}

export interface EnrichedOrganization {
	// Core JSON-LD required
	'@context'?: string;
	'@type': 'Organization' | 'CollegeOrUniversity';
	'@id': string;

	// Common schema.org fields for Organization
	name: string;
	alternateName?: string | string[];
	url?: Url;
	logo?: string;
	image?: string;
	description?: string;
	disambiguatingDescription?: string;
	email?: string;
	telephone?: string;
	foundingDate?: string;
	dissolutionDate?: string;
	founder?: Ref[] | Person | Person[];
	funder?: Ref[] | Person | Person[];
	foundingLocation?: Place | string;
	location?: Place | string;
	address?: PostalAddress | string;
	memberOf?: Ref | Organization | string;
	member?: Ref[] | Role[];
	parentOrganization?: Ref | Organization | string;
	subOrganization?: Ref | Organization | string;
	alumni?: Ref | Person | string;
	employee?: Ref | Person | string;
	numberOfEmployees?: QuantitativeValue;
	department?: Ref | EnrichedOrganization | EducationalOccupationalProgram;

	// Legal / commercial
	legalName?: string;

	// Geo/social extensions
	sameAs?: string[];
	hasCredential?: Ref | EducationalOccupationalCredential | string;

	// Web metadata (you may add these manually)
	mainEntityOfPage?: string;
	subjectOf?: Ref[];

	// Custom extensions
	'x-tags'?: string[];
	'x-logo'?: string;
	'x-priority'?: number;
}
