import {
  Announcement,
  School,
  Guide,
  Document,
  UsefulSite,
  FAQ,
  ContactInfo,
  SchoolContact
} from '../types';

import announcementsData from './announcements.json';
import schoolsData from './schools.json';
import guidesData from './guides.json';
import documentsData from './documents.json';
import usefulSitesData from './usefulSites.json';
import faqsData from './faqs.json';
import contactInfoData from './contactInfo.json';
import schoolContactsData from './schoolContacts.json';

export const announcements: Announcement[] = announcementsData as Announcement[];
export const schools: School[] = schoolsData as School[];
export const guides: Guide[] = guidesData as Guide[];
export const documents: Document[] = documentsData as Document[];
export const usefulSites: UsefulSite[] = usefulSitesData as UsefulSite[];
export const faqs: FAQ[] = faqsData as FAQ[];
export const contactInfo: ContactInfo = contactInfoData as ContactInfo;
export const schoolContacts: SchoolContact[] = schoolContactsData as SchoolContact[];
