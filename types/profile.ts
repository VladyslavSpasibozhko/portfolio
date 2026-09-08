export type TechStackCategory =
    | 'languages'
    | 'frameworks'
    | 'styling'
    | 'cssPreprocessors'
    | 'dataFetching'
    | 'stateManagement'
    | 'testing'
    | 'builder'
    | 'toolingAndBuild';

export interface TechStackItem {
    id: string;
    title: string;
    category: TechStackCategory;
    yearsOfExperience: number;
    weight: number;
}

export interface UseCase {
    title: string;
    description: string;
}

export interface WorkExperience {
    position: string;
    company: string;
    companyUrl?: string;
    companyType?: string;
    domain?: string;
    duration: string;
    location: string;
    companyDescription: string;
    companyInfo: {
        keyProducts?: string[];
        keyFeatures?: string[];
        companyStats?: string[];
        services?: string[];
    } | null;
    technicalDetails: string | null;
    responsibilities: string[];
    techStack: string[];
    useCases: UseCase[] | null;
    keyDecisions: string[];
}

export interface ProfileData {
    techStack: TechStackItem[];
    personal: {
        name: string;
        email: string;
        title: string;
        currentLocation: string;
        preferredLocation: string;
        gitUser: string;
        linkedin: string;
        intro: string;
        stats: {
            yearsOfExperience: number;
        };
    };
    salaryExpectation: {
        b2b_usd: {
            netto: string;
            ryczaltTax: string;
            zus: string;
            vat: string;
            brutto: string;
            exchangeRate: string;
        };
        b2b_eur: {
            netto: string;
            ryczaltTax: string;
            zus: string;
            vat: string;
            brutto: string;
            exchangeRate: string;
        };
    };
    workExperience: WorkExperience[];
    education: Array<{
        institution: string;
        degree: string;
        field: string;
        gpa: string;
        period: string;
    }>;
    coursesAndCertifications: Array<{
        title: string;
        provider: string;
        period: string;
    }>;
    languages: Array<{
        language: string;
        level: string;
    }>;
    softSkills: {
        [key: string]: {
            title: string;
            highlights: string[];
        };
    };
    whatImLookingFor: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
}
