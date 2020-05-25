import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
} from 'react-share';

const socialShare = ({ image, title }) => {
  const size = 28;

  const blogTitle = title;
  return (
    <div>
      <EmailShareButton subject={blogTitle}>
        <EmailIcon size={size} round={true} />
      </EmailShareButton>
      <FacebookShareButton quote={blogTitle} url={String(window.location)}>
        <FacebookIcon size={size} round={true} />
      </FacebookShareButton>
      <TwitterShareButton title={blogTitle} url={String(window.location)}>
        <TwitterIcon size={size} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton
        title={blogTitle}
        separator=':: '
        url={String(window.location)}
      >
        <WhatsappIcon size={size} round={true} />
      </WhatsappShareButton>
      <LinkedinShareButton
        title={blogTitle}
        windowWidth={750}
        windowHeight={600}
        url={String(window.location)}
      >
        <LinkedinIcon size={size} round={true} />
      </LinkedinShareButton>
      <PinterestShareButton
        url={String(window.location)}
        media={`${image}`}
        windowWidth={1000}
        windowHeight={730}
      >
        <PinterestIcon size={size} round={true} />
      </PinterestShareButton>
    </div>
  );
};

export default socialShare;
