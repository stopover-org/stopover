import { graphql, useLazyLoadQuery } from "react-relay";
import { useTranslation } from "react-i18next";
import { Sheet } from "@mui/joy";
import React from "react";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard/AuthGuard";
import Typography from "components/v2/Typography";
import { scene_PrivacyQuery } from "artifacts/scene_PrivacyQuery.graphql";
import Link from "components/v2/Link";

const Privacy = () => {
  const [server, setServer] = React.useState(true);
  const data = useLazyLoadQuery<scene_PrivacyQuery>(
    graphql`
      query scene_PrivacyQuery {
        currentUser {
          ...Layout_CurrentUserFragment
        }
      }
    `,
    {}
  );
  const { t } = useTranslation();

  useDocumentTitle(t("general.privacy"));

  React.useEffect(() => {
    setServer(false);
  }, []);

  if (server) return null;

  return (
    <Layout currentUserFragment={data.currentUser}>
      <AuthGuard accessible>
        <Sheet sx={{ margin: "0 auto", maxWidth: "1024px" }}>
          <Typography level="h3">PRIVACY AND COOKIES STATEMENT</Typography>
          <br />
          <Typography level="h4">Effective: February 17, 2024</Typography>

          <Typography>
            MIKHAIL DOROKHOVICH PR RAČUNARSKO PROGRAMIRANJE BEOGRAD (STARI
            GRAD), owns and operates a service that enables users to research,
            find, and book travel experiences worldwide. In this Statement,
            these are collectively referred to as our “Services”.
          </Typography>
          <Typography>
            The information that you and others entrust us with enhances our
            ability to provide more relevant, personalized, and helpful
            Services. We know that sharing your personal information with us is
            based on trust. We take your trust in us seriously and are committed
            to providing you with helpful information, products, and Services,
            curated based on the information you have shared with us. Equally,
            and perhaps more importantly, we are committed to respecting your
            privacy when you visit our website or use our Services, and being
            transparent about how we use the information you have entrusted to
            us. Please review this privacy and cookies statement (“Statement”)
            carefully to learn about our privacy practices.
          </Typography>
          <Typography>
            This Statement describes how we obtain, use, and process your
            information – hopefully, in an easily understandable and transparent
            manner. It informs you of the rights you have, how you can exercise
            them, and how you can contact us. Please review this Statement
            carefully to learn about our practices with respect to information
            and privacy. By visiting our website and mobile application, whether
            on a computer, phone, tablet, or similar device (each of these is
            referred to as a “Device”), you acknowledge and confirm that you
            have read this Statement.
          </Typography>
          <Typography>
            We offer our Services to users in a number of countries and
            territories where the laws and customs differ. This Statement
            provides a general overview of our privacy practices. In addition,
            sections 12 and 13 of this Statement provide specific information
            relevant to users residing in certain regions or countries.
          </Typography>
          <Typography />
          <br />
          <Typography level="h4">
            1. Information Collected and Processed
          </Typography>
          <Typography>
            When you access or use our Services, we collect and process
            information from and about you to provide the Services in a more
            personalized and relevant way. Some information we collect
            passively; for example, with our servers or with cookies or other
            similar tracking technologies. Some information we collect from
            different sources, including from you, affiliated entities, business
            partners, and other independent third-party sources. When you use
            our Services by “clicking-through” from a third-party website or
            when you visit third-party websites via our Services, those
            third-party websites may share information with us about your use of
            their service. Any information we receive from third-party websites
            may be combined with the information provided by you. Information
            collected may include the following:
          </Typography>
          <Typography>
            Contact information, including name, phone number and postal and
            email addresses (both hashed and unhashed)
          </Typography>
          <Typography>
            Billing and other payment information (such as your bank account
            information, credit card number, cardholder name, expiration date,
            authentication code and billing address)
          </Typography>
          <Typography>
            Documentation to support travel and planning, including identity
            verification documents, if you choose to provide it to us
          </Typography>
          <Typography>Username and password</Typography>
          <Typography>
            Photos, reviews, social posts, and videos you may have provided to
            us
          </Typography>
          <Typography>Geolocation information</Typography>
          <Typography>
            Device information, such as when you accessed our Services and
            information about the Device used (for example, IP address, software
            or internet browser used, preferred languages, unique Device
            identifiers and advertising identifiers)
          </Typography>
          <Typography>
            Online activity, including pages you have visited, content reviewed,
            and apps reviewed
          </Typography>
          <Typography>Purchasing and booking history</Typography>
          <Typography>
            Information about your travel and experience plans and preferences
          </Typography>
          <Typography>
            Communications when you contact our customer service team, including
            inbound and outbound calls
          </Typography>
          <Typography>
            Information that you have provided to third party companies for the
            purposes of logging into social media platforms. This includes
            publicly available information, such as name, age range as well as
            email addresses.
          </Typography>
          <Typography>
            We may also collect, in instances where you have provided it,
            information about other travelers, including their email address and
            other travel-related information. If you are sharing information
            with us about other individuals, you must obtain their consent and
            ensure that they have understood and accepted how we will use their
            personal information (as described in this Statement).
          </Typography>
          <Typography>
            In addition to the categories noted above, we may also collect
            certain location information if you have instructed your Device to
            send such information via the privacy settings on that Device, or,
            for example, if you have uploaded photos tagged with location
            information.
          </Typography>
          <br />
          <Typography level="h4">2. Information Uses and Purposes</Typography>
          <Typography>
            To the extent possible, we want to provide you with relevant content
            and a tailored experience when you use our Services, and we use
            information about you to do that, including in the following ways:
          </Typography>
          <Typography>Registration and other contracts</Typography>
          <Typography>
            Register and manage your account, including to allow you access to
            and use of our Services
          </Typography>
          <Typography>Facilitate your bookings</Typography>
          <Typography>Process payments or credits</Typography>
          <Typography>
            Make promotional offers to you that may include competitions, gift
            cards, rewards, cash back, and discounts
          </Typography>
          <Typography>Improve our Services</Typography>
          <Typography>
            Use your information for analytical purposes and to enable us to
            improve our Services
          </Typography>
          <Typography>
            Provide you with a tailored/optimized experience by grouping users
            based on, for example, usage, interests, and demographics
          </Typography>
          <Typography>
            Send you survey or market research invitations
          </Typography>
          <Typography>Individualization and customization</Typography>
          <Typography>
            Notify you about special offers, prize draws, competitions, and
            Services available from us, our affiliates, or our partners that may
            be of interest to you
          </Typography>
          <Typography>
            Tailor your experience, including by making inferences about your
            interests and preferences based on your activity, and customize the
            ads shown to you both on and off our website
          </Typography>
          <Typography>Communication</Typography>
          <Typography>
            Communicate with you or facilitate communication between you, our
            partners, and/or affiliates
          </Typography>
          <Typography>
            Conduct, monitor and record your calls or interactions with us; for
            example, your communications with our customer service or sales
            teams, or through our use of pixels and similar technologies to
            monitor how you interact with our emails to you, such as whether you
            open or click on content in our emails
          </Typography>
          <Typography>
            Host your reviews, ratings, photos, videos and other content
          </Typography>
          <Typography>
            Customize your experience, including customizing the ads shown to
            you on and off our website
          </Typography>
          <Typography>Respond to your questions and comments</Typography>
          <Typography>Legal Compliance</Typography>
          <Typography>Resolve disputes or troubleshoot problems</Typography>
          <Typography>
            Prevent fraud and other potentially prohibited or unlawful
            activities
          </Typography>
          <Typography>
            Comply with relevant laws, respond to legal requests, prevent harm,
            and protect our rights and the rights of other users and third
            parties
          </Typography>
          <Typography>
            Provide payment services, including to detect and prevent money
            laundering, fraud and security incidents, to comply with legal
            obligations, and to enforce payments terms of service
          </Typography>
          <Typography>
            Please note, if we use automated decision-making to process your
            personal information, we will implement appropriate measures
            required to safeguard your rights and freedoms including your right
            to obtain human intervention.
          </Typography>
          <br />
          <Typography level="h4">3. Information Sharing</Typography>
          <Typography>
            In order to provide some of our Services, we may need to share
            information with certain other third parties, including our group of
            companies, in the following circumstances:
          </Typography>
          <Typography>
            Our Group of Companies. We share information with companies in our
            corporate family so we can provide you with information about
            products and services, both travel-related and others, which might
            interest you. This sharing also allows us to better understand how
            you interact with the websites, apps, and services of our group
            companies. These companies and websites will comply with this
            Statement and all applicable laws governing the transmission of
            promotional communications.
          </Typography>
          <Typography>
            Experience Suppliers and travelers. We may share travelers’ personal
            information with suppliers of experiences to allow them to fulfil
            the bookings made through our Services. We may also share personal
            information of experience suppliers with travelers, including but
            not limited to where there is a dispute between the two parties.
          </Typography>
          <Typography>
            Service Providers. We share information with certain service
            providers used to facilitate our Services, including to help with
            transactions.
          </Typography>
          <Typography>
            Business Partners. We may share information about you, your Devices
            and your use of our Services with our trusted business partners. For
            example, we may share information so that we can facilitate payments
            for services you may see promoted on the websites of our partners.
            This sharing is generally pursuant to written agreements which
            include confidentiality, privacy and security obligations; please
            note, however, that we do not control the privacy practices of these
            third-party business partners.
          </Typography>
          <Typography>
            Social Media Sites. When you use our Services and elect to share
            information with third-party social media websites, the information
            you share will be governed by the privacy policies of those social
            media websites and the privacy settings you have set with those
            social media websites.
          </Typography>
          <Typography>
            Advertising Networks. We sometimes collect and share information
            about your interests with advertising networks and data aggregators.
            Some of these companies are members of the Network Advertising
            Initiative or the Digital Advertising Alliance, which offer a single
            location to opt-out of ad targeting from member companies. To learn
            more, please click here.
          </Typography>
          <Typography>
            Fraud Detection Companies. Third parties may assist us by providing
            us with their fraud detection technologies.
          </Typography>
          <Typography>
            Other third parties, such as referring websites.Third parties may
            also assist us in collecting information by, for example, operating
            features of our website or facilitating the delivery of online
            advertising tailored to your interests. We may share audience
            segments and other information, such as hashed email addresses, with
            third parties that use that information for tailored advertising to
            you. Other third parties may also provide us with their content and
            contract generation, management, and hosting tools. Third parties
            may only collect or access information as needed to perform their
            permitted functions. If and to the extent these third parties only
            assist us to perform our processing operations, we have bound them
            contractually to only act on our behalf as so-called data
            processors.
          </Typography>
          <Typography>
            Certain Device operating system versions permit you to opt out of
            certain types of information sharing, including to certain
            advertising networks. You can change the privacy settings of your
            Device at any time in order to turn off the functionality that
            collects and shares location information. Please check your Device
            settings if you want to limit such tracking. However, turning off
            location-sharing may affect certain features that we offer. If you
            have any questions about the privacy settings of your Device, we
            suggest you contact the manufacturer of your Device or your mobile
            service provider for help.
          </Typography>
          <Typography>
            We also may share your information if we believe, in our sole
            discretion, that such disclosure is necessary:
          </Typography>
          <Typography>
            To comply with legitimate and enforceable subpoenas, court orders,
            or other legal process; to establish or exercise our legal rights;
            to defend against legal claims; or as otherwise required by law. In
            such cases, we reserve the right to raise or waive any legal
            objection or right available to us.
          </Typography>
          <Typography>
            To investigate, prevent, or take action regarding illegal or
            suspected illegal activities; to protect and defend the rights,
            property, or safety of Stopoverx, our customers, or others; and in
            connection with our Terms of Use and other agreements.
          </Typography>
          <Typography>
            In connection with a corporate transaction, such as a divestiture,
            merger, consolidation, or asset sale, or in the unlikely event of
            bankruptcy.
          </Typography>
          <br />
          <Typography level="h4">4. Information Choices</Typography>
          <Typography>
            You have options with respect to the processing and use of your
            information by us. You can access, update, and even deactivate your
            account by writing to our tech support{" "}
            <Link href="mailto:mikhail@stopoverx.com" primary>
              mikhail@stopoverx.com
            </Link>
            . In addition, you can do the following:
          </Typography>
          <Typography>Choose the way we communicate with you.</Typography>
          <Typography>
            Choose not to provide us with certain information, although it may
            be needed to take advantage of certain features offered on our
            website.
          </Typography>
          <Typography>
            Prevent the collection of certain geolocation information (e.g. by
            switching off location services for our app in the settings of your
            phone), but note that turning off location sharing may affect
            certain features of our Services.
          </Typography>
          <Typography>
            Deactivate your account with our tech support. We may retain some
            information associated with your account (including past
            transactions) for internal purposes including backups, fraud
            prevention, dispute resolution, investigations, our own legitimate
            business interests, and legal compliance for the period necessary to
            fulfil the purposes outlined in this Statement.
          </Typography>
          <Typography>
            Unsubscribe from promotional messages, including emails with
            travel-related opportunities, in any such email we send.
          </Typography>
          <br />
          <Typography level="h4">5. Information on Children</Typography>
          <Typography>
            Our Services are not intended for children, which we consider to be:
            (i) individuals that are 13 years of age or under, or the age of
            privacy consent in your jurisdiction; or (ii) when processing data
            on the basis of a contract, the age of legal capacity to enter into
            the agreement.
          </Typography>
          <Typography>
            We will only collect or process information belonging to children
            under very limited circumstances. We might need to collect personal
            information belonging to children as part of our Service if, for
            example, the personal information is required as part of an
            experience-related reservation. We will only collect personal
            information belonging to children if it is provided by and with
            consent of a parent or guardian. If we become aware that we have
            processed the personal information of a child without the valid
            consent of a parent or guardian, we will delete the personal
            information.
          </Typography>
          <br />
          <Typography level="h4">6. Information Transfers</Typography>
          <Typography>
            We offer our Services to users located in many different
            jurisdictions. If we transfer your information to other countries,
            we will use and protect that information as described in this
            Statement and in accordance with applicable law.
          </Typography>
          <br />
          <Typography level="h4">7. Information Security</Typography>
          <Typography>
            We have implemented appropriate administrative, technical, and
            physical security procedures to help protect your information. We
            only authorize specific personnel to access personal information and
            they may do so only for permitted business functions. We use
            encryption when transmitting your information between your system
            and ours, and between our system and those of the parties with whom
            we share information. We also employ firewalls and intrusion
            detection systems to help prevent unauthorized access to your
            information. However, we cannot guarantee the security of
            information from unauthorized entry or use, hardware or software
            failure, or other circumstances outside of our control.
          </Typography>
          <br />
          <Typography level="h4">
            8. Information Deletion and Retention
          </Typography>
          <Typography>
            We will retain copies of your information for as long as you
            maintain your account or as necessary in connection with the
            purposes set out in this Statement, unless applicable law requires a
            longer retention period. In addition, we may retain your information
            for the duration of any period necessary to establish, exercise or
            defend any legal rights.
          </Typography>
          <br />
          <Typography level="h4">9. Cookies</Typography>
          <Typography>
            We want your access to our Services to be as easy, efficient, and
            useful as possible. To help us do this, we use cookies and similar
            technologies to improve your experience, to enhance website
            security, and to show you relevant advertising.
          </Typography>
          <Typography>
            Cookies are small text files that are automatically placed on your
            Device when you visit almost any website. They are stored by your
            internet browser and contain basic information about your internet
            use. Your browser sends the information from these cookies back to a
            website every time you revisit it, so it can recognize your Device
            and improve your experience by, among other things, providing you
            with personalized content. We also use other tracking technologies,
            such as pixel, SDKs, or server logs, that have a similar
            functionality. We also use cookies and tracking technologies to
            remember your login details, so you don’t have to re-enter them
            repeatedly when you use our Services or to help us understand your
            preferences.
          </Typography>
          <br />
          <Typography level="h4">10. Statement Changes</Typography>
          <Typography>
            We may update this Statement in the future. If we believe any
            changes are material, we will let you know by doing one or more of
            the following: sending you a communication about the changes,
            placing a notice on the website and/or posting an updated Statement
            on the website. We will note at the top of this Statement when it
            was most recently updated. We encourage you to check back from time
            to time to review the most current version and to periodically
            review this Statement for the latest information on our privacy
            practices.
          </Typography>
          <br />
          <Typography level="h4">11. Contact</Typography>
          <Typography>
            If you have a data privacy request, such as a request to delete or
            access your data, please visit our dedicated privacy portal by
            clicking here. For general data privacy inquiries or questions
            concerning our Privacy and Cookies Statement, please contact our
            privacy team by clicking here.
          </Typography>
          <br />
          <Typography>
            MIKHAIL DOROKHOVICH PR RAČUNARSKO PROGRAMIRANJE BEOGRAD (STARI GRAD)
          </Typography>
          <Typography>Makedonska 21, 11070</Typography>
          <Typography>Grad Beograd</Typography>
          <Typography>Beograd, Stari Grad</Typography>
          <Typography>Serbia</Typography>
        </Sheet>
      </AuthGuard>
    </Layout>
  );
};

export default React.memo(Privacy);
