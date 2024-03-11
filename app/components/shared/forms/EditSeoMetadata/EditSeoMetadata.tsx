import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box } from "@mui/joy";
import Button from "components/v2/Button";
import { EditSeoMetadata_MetadataFragment$key } from "artifacts/EditSeoMetadata_MetadataFragment.graphql";
import EditSeoMetadataModal from "./EditSeoMetadataModal";

interface EditEventTourPlanProps {
  seoMetadatumFragmentRef: EditSeoMetadata_MetadataFragment$key;
  menuItem: boolean;
}

const EditSeoMetadata = ({
  seoMetadatumFragmentRef,
  menuItem = false,
}: EditEventTourPlanProps) => {
  const metadata = useFragment<EditSeoMetadata_MetadataFragment$key>(
    graphql`
      fragment EditSeoMetadata_MetadataFragment on SeoMetadatum {
        ...useEditSeoMetadataForm_SeoMetadatumFragment
      }
    `,
    seoMetadatumFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  return (
    <>
      <Box>
        <Button
          size="sm"
          color={menuItem ? "neutral" : "primary"}
          variant={menuItem ? "plain" : "solid"}
          onClick={() => setModalOpened(true)}
        >
          {t("forms.editSeoMetadata.action")}
        </Button>
      </Box>
      <EditSeoMetadataModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
        seoMetadatumFragmentRef={metadata}
      />
    </>
  );
};

export default React.memo(EditSeoMetadata);
