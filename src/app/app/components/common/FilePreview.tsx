import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import { useImagePreviewStore } from "@/store/imagepreviewstore";

export type ViewType = 'Image';

export type FilePreviewMetadata = {
    fileName: string,
    fileExtension: string,
}

interface Props {
    viewType: ViewType,
    fileMetadata: FilePreviewMetadata,
    fileUrl: any,
}

export const FilePreview: React.FC<Props> = ({ viewType, fileMetadata, fileUrl }) => {
    const imagePreviewStore = useImagePreviewStore();
    const {setBgBlurV} = useCurrents();
    
    const onClickImage = () => {
        imagePreviewStore.setFileUrl(fileUrl);
        imagePreviewStore.setShown(true);
    }

    if (viewType === "Image") {
        return (
            <>
                <img id="message-attachment-image-preview" className={styles.image_preview_message} src={fileUrl} onClick={onClickImage} />
            </>
        );
    }
}