import { Badge } from "@components/atoms/Badge";
import { Icon } from "@components/atoms/Icon";
import { Link } from "@components/atoms/Link";
import { Typography } from "@components/atoms/Typography";
import { Modal } from "@components/molecules/Modal";
import { getProfileData } from "@lib/api";

const COMPANY_INFO_LABELS: Record<string, string> = {
  keyProducts: "Key Products",
  keyFeatures: "Key Features",
  companyStats: "Company Stats",
  services: "Services",
};

export interface CompanyModalProps {
  companyName: string | null;
  onClose: () => void;
}

// TODO: update CompanyModal
export function CompanyModal({ companyName, onClose }: CompanyModalProps) {
  const { workExperience } = getProfileData();
  const selectedCompany = workExperience.find(
    (exp) => exp.company === companyName,
  );

  if (!selectedCompany) {
    console.warn(
      `CompanyModal: No work experience found for company "${companyName}"`,
    );

    return null;
  }

  return (
    <Modal
      isOpen={Boolean(companyName)}
      onClose={onClose}
      title={
        <Typography tag="span" className="inline-flex items-center gap-2">
          {selectedCompany.company}
          {selectedCompany.companyUrl && (
            <Link
              href={selectedCompany.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${selectedCompany.company} website`}
            >
              <Icon name="external-link" size="lg" />
            </Link>
          )}
        </Typography>
      }
      size="4xl"
    >
      <div className="space-y-4">
        {(selectedCompany.companyType || selectedCompany.domain) && (
          <div className="flex flex-wrap gap-2">
            {selectedCompany.companyType && (
              <Badge variant="default">{selectedCompany.companyType}</Badge>
            )}
            {selectedCompany.domain && (
              <Badge variant="default">{selectedCompany.domain}</Badge>
            )}
          </div>
        )}

        <Typography tag="p" className="text-sm text-gray-300">
          {selectedCompany.companyDescription}
        </Typography>

        {selectedCompany.technicalDetails && (
          <Typography tag="p" className="text-sm text-gray-400">
            {selectedCompany.technicalDetails}
          </Typography>
        )}

        {selectedCompany.companyInfo &&
          Object.entries(selectedCompany.companyInfo).map(
            ([key, values]) =>
              values && (
                <div key={key}>
                  <Typography
                    tag="small"
                    className="mb-1 block uppercase tracking-wide text-gray-400"
                  >
                    {COMPANY_INFO_LABELS[key] ?? key}
                  </Typography>
                  <ul className="list-disc list-inside space-y-0.5">
                    {values.map((value, idx) => (
                      <Typography
                        key={idx}
                        tag="span"
                        className="block text-sm"
                      >
                        {value}
                      </Typography>
                    ))}
                  </ul>
                </div>
              ),
          )}
      </div>
    </Modal>
  );
}
