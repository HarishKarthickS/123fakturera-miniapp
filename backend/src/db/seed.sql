-- Seed an admin user (ensure password is bcrypt hashed)
INSERT INTO users (username, email, password, role)
VALUES (
  'admin',
  'admin@123fakturera.se',
  '$2a$10$fdf6tIteIp0MlDEqwywDsurcId8/1sWntpgVXZWiBPc/8FFyd02mK',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Seed 25 sample products for demo/testing
INSERT INTO products (article_no, item_name, in_price, out_price, unit, in_stock, description)
VALUES
('1234567890', 'Test Product 1', 900500, 1500800, 'kilometers/hour', 2500600, 'This is a test product for system verification.'),
('9876543210', 'Consulting Hour', 50000, 80000, 'hour', 1000, 'Hourly IT consulting service'),
('1122334455', 'Website Design', 200000, 300000, 'project', 25, 'Responsive website design package'),
('9988776655', 'Hosting Package', 60000, 90000, 'month', 100, 'Standard web hosting plan'),
('4455667788', 'Maintenance Plan', 100000, 150000, 'month', 50, 'Monthly technical maintenance'),
('2233445566', 'Premium Support', 75000, 120000, 'ticket', 150, 'Priority tech support for clients'),
('5566778899', 'Cloud Backup', 40000, 60000, 'GB', 5000, 'Automated daily data backup'),
('7788990011', 'Data Migration', 250000, 350000, 'migration', 10, 'Full system migration assistance'),
('9900112233', 'Logo Design', 70000, 100000, 'design', 45, 'Professional brand logo creation'),
('6655443322', 'SEO Optimization', 150000, 220000, 'package', 15, 'Improve website ranking and visibility'),
('3322110099', 'Email Setup', 25000, 40000, 'setup', 250, 'Business email configuration and integration'),
('1112223334', 'App Deployment', 130000, 200000, 'deployment', 20, 'Deploy web or mobile applications'),
('2223334445', 'Performance Tuning', 200000, 290000, 'service', 12, 'Optimize server and app performance'),
('3334445556', 'Security Setup', 160000, 230000, 'setup', 25, 'Firewall and SSL configuration'),
('4445556667', 'API Integration', 180000, 260000, 'integration', 18, 'Third-party API or service integration'),
('5556667778', 'UI/UX Review', 90000, 140000, 'review', 35, 'User interface and experience analysis'),
('6667778889', 'Software License', 180000, 250000, 'license', 100, 'Annual software licensing fee'),
('7778889990', 'Domain Registration', 15000, 25000, 'domain', 200, 'Domain name purchase and setup'),
('8889990001', 'Database Setup', 120000, 180000, 'setup', 15, 'PostgreSQL database configuration'),
('9990001112', 'Marketing Consultation', 100000, 150000, 'session', 8, 'Strategy and campaign planning'),
('0001112223', 'Training Session', 80000, 120000, 'session', 30, '1-hour technical training for teams'),
('1112223335', 'Audit Report', 110000, 170000, 'report', 20, 'Full project or system audit report'),
('2223334446', 'Custom Dashboard', 200000, 300000, 'dashboard', 10, 'Interactive dashboard development'),
('3334445557', 'Content Writing', 60000, 100000, 'article', 60, 'Website or blog content creation'),
('4445556668', 'Video Editing', 120000, 200000, 'project', 15, 'Professional editing for promotional videos')
ON CONFLICT (article_no) DO NOTHING;


INSERT INTO page_content (page_name, section, component_key, language, content, display_order)
VALUES
-- English Terms Page
('terms', 'nav', 'nav_home', 'en', 'Home', 1),
('terms', 'nav', 'nav_order', 'en', 'Order', 2),
('terms', 'nav', 'nav_customers', 'en', 'Our Customers', 3),
('terms', 'nav', 'nav_about', 'en', 'About us', 4),
('terms', 'nav', 'nav_contact', 'en', 'Contact Us', 5),
('terms', 'nav', 'nav_terms', 'en', 'Terms', 6),
('terms', 'nav', 'nav_login', 'en', 'Login', 7),
('terms', 'nav', 'lang_switcher', 'en', 'English', 8),
('terms', 'body', 'title', 'en', 'Terms | Villkor', 1),
('terms', 'body', 'content', 'en', 'BY clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.

You can use the program FOR FREE for 14 days.

123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.

You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.

If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.

Billing is for one year at a time.

The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year''s use of the program.

(When using the offer price of SEK 99, the one-year period is calculated from registration.)

All prices are excluding. VAT.

Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.

Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.

The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.

The introductory offer ( SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.

If you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.

License for the use of 123 Fakturera is of course sold in accordance with applicable laws.

In order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.

In connection with the storage of information, the law requires that we provide you with the following information:

If you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don''t want to be contacted, just send us an email about it.

You can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.

For natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like, and tell others that you are customer. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.

You of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us here. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.

If you wish to contact us, please use the information on this website.

Click on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)

Our experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.

Have a great day!', 2),
('terms', 'body', 'button', 'en', 'Close and Go Back', 3),

-- Swedish Terms Page
('terms', 'nav', 'nav_home', 'sv', 'Hem', 1),
('terms', 'nav', 'nav_order', 'sv', 'Beställ', 2),
('terms', 'nav', 'nav_customers', 'sv', 'Våra Kunder', 3),
('terms', 'nav', 'nav_about', 'sv', 'Om oss', 4),
('terms', 'nav', 'nav_contact', 'sv', 'Kontakta oss', 5),
('terms', 'nav', 'nav_terms', 'sv', 'Villkor', 6),
('terms', 'nav', 'nav_login', 'sv', 'Logga in', 7),
('terms', 'nav', 'lang_switcher', 'sv', 'Svenska', 8),
('terms', 'body', 'title', 'sv', 'Terms | Villkor', 1),
('terms', 'body', 'content', 'sv', 'GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in och texten på registrerings sidan och villkoren här, och accepterar samtidigt villkoren här.

Ni kan använda programmet GRATIS i 14 dagar.

123 Fakturera är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge oss besked inom 14 dagar från registrering.

Ni har självklart rätt att avsluta användningen av programmet utan kostnad, genom att ge oss besked per email inom 14 dagar från registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något.

Om vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.

Fakturering sker för ett år i taget.

Priset för 123 Fakturera (specialpris kr 99:- / ord. pris kr 159:- per månad) är för årsavgift Start för ett års användning av programmet.

(Vid användning av specialpriset kr 99:- så räknas ett års perioden från registrering.)

Alla priser är exkl. moms.

Offert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.

Förmedling, samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock självklart med oss. Betalningen görs till det företag som fakturan kommer från.

Årsavgiften är löpande men om ni inte vill fortsätta att använda programmet, så är det bara att ge besked trettio dagar innan ingången av nästföljande ett års period.

Introduktionspriset (kr 99:- per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är, för årsavgift Start, ett hundra och femtinio kronor per månad, för årsavgift Fjärrstyrning, tre hundra kronor per månad och för årsavgift Pro, tre hundra och trettiotre kronor per månad. Efter ett år faktureras årsavgift Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked när som helst innan förfallodagen.

Om ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering, om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt till att annullera beställningen. Vi hjälper gärna att fiksa logo för er till självkostpris.

Licens för användning av 123 Fakturera säljs självklart enligt gällande lagar.

För att lättare kunna hjälpa er och ge er support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.

I samband med lagring av information så kräver lagen att vi ger er följande information:

Om ni beställer som privatperson så har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer använda den för att kunna hjälpa er om ni behöver hjälp, följa lagarna ang. bokföring m.m. När det kommer uppgraderingar och liknande, kan vi komma att skicka er erbjudande och liknande om våra produkter och tjänster per email eller liknande. Ni kan också komma att bli kontaktad per email, post och telefon. Om ni inte vill bli kontaktad, bara skicka oss en email ang. det.

Ni kan när som helst begära att inte få tillsänt information om uppgraderingar per email, brev eller liknande och vi kommer då självklart inte att göra det. Sådan begäran skickar ni till oss per email, brev eller liknande.

Av naturliga orsaker måste vi spara, databehandla och flytta era data. Er information sparas tills vidare. Ni ger oss medgivande till att lagra, databehandla och flytta era data, samt att skicka er erbjudanden och liknande per email, brev och liknande, samt att informera andra om att ni är kund. Pga. sättet det fungerar på med programvara behöver medgivandet också ges till andra parter. Medgivandet ges därför till oss, samt till de företag och/eller person/personer som äger programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer till att äga programvaran, källkod, hemsidan och liknande. Detta både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom att under förmedla programvaran eller på annat sätt.

Ni har självklart rätt att begära tillgång till, rättelse eller radering av informationen vi har om er. Ni har också rätt att begära begränsning av behandlingen av era uppgifter, eller att invända mot behandling samt rätten till dataportabilitet. Ni har självklart rätt att klaga till tillsynsmyndighet. Mer juridisk info om oss hittar ni här. Det är lagarna i Irland som är gällande lagar. Det är självklart helt frivilligt att lägga er order. Vi använder självklart inte någon automatiserad profilering och inte heller något automatiserat beslutsfattande.

Om ni vill kontakta oss, vänligen använd då informationen på denna hemsidan.

Klicka på Fakturera Nu för att registrera i enlighet med den information som ni har lagt in och villkoren här. (Datum och tidpunkt för inläggningen läggs in automatiskt i våra register.)

Vår erfarenhet är att våra kunder är mycket nöjda med sättet vi arbetar på och vi hoppas och tror att det också kommer att bli er upplevelse.

Ha en trevlig dag!', 2),
('terms', 'body', 'button', 'sv', 'Stäng och gå tillbaka', 3)
ON CONFLICT (page_name, section, component_key, language) DO NOTHING;

INSERT INTO page_content (page_name, section, component_key, language, content, display_order)
VALUES
-- Login Page - English
('login', 'header', 'title', 'en', 'Log in', 1),
('login', 'form', 'email_label', 'en', 'Enter your email address', 1),
('login', 'form', 'email_placeholder', 'en', 'Email address', 2),
('login', 'form', 'password_label', 'en', 'Enter your password', 3),
('login', 'form', 'password_placeholder', 'en', 'Password', 4),
('login', 'form', 'button_submit', 'en', 'Log in', 5),
('login', 'actions', 'link_register', 'en', 'Register', 1),
('login', 'actions', 'link_forgot_password', 'en', 'Forgotten password?', 2),

-- Login Page - Swedish
('login', 'nav', 'nav_home', 'sv', 'Hem', 1),
('login', 'nav', 'nav_order', 'sv', 'Beställ', 2),
('login', 'nav', 'nav_customers', 'sv', 'Våra Kunder', 3),
('login', 'nav', 'nav_about', 'sv', 'Om oss', 4),
('login', 'nav', 'nav_contact', 'sv', 'Kontakta oss', 5),
('login', 'nav', 'nav_terms', 'sv', 'Villkor', 6),
('login', 'nav', 'nav_login', 'sv', 'Logga in', 7),
('login', 'nav', 'lang_switcher', 'sv', 'Svenska', 8),
('login', 'header', 'title', 'sv', 'Logga in', 1),
('login', 'form', 'email_label', 'sv', 'Skriv in din epost adress', 1),
('login', 'form', 'email_placeholder', 'sv', 'Epost adress', 2),
('login', 'form', 'password_label', 'sv', 'Skriv in ditt lösenord', 3),
('login', 'form', 'password_placeholder', 'sv', 'Lösenord', 4),
('login', 'form', 'button_submit', 'sv', 'Logga in', 5),
('login', 'actions', 'link_register', 'sv', 'Registrera dig', 1),
('login', 'actions', 'link_forgot_password', 'sv', 'Glömt lösenord?', 2),

-- login - English
('login', 'nav', 'nav_home', 'en', 'Home', 1),
('login', 'nav', 'nav_order', 'en', 'Order', 2),
('login', 'nav', 'nav_customers', 'en', 'Our Customers', 3),
('login', 'nav', 'nav_about', 'en', 'About us', 4),
('login', 'nav', 'nav_contact', 'en', 'Contact Us', 5),
('login', 'nav', 'nav_terms', 'en', 'Terms', 6),
('login', 'nav', 'nav_login', 'en', 'Login', 7),
('login', 'nav', 'lang_switcher', 'en', 'English', 8),
('login', 'brand', 'brand_name', 'en', '123 Fakturera', 1),
('login', 'links', 'nav_home', 'en', 'Home', 1),
('login', 'links', 'nav_order', 'en', 'Order', 2),
('login', 'links', 'nav_contact', 'en', 'Contact us', 3),
('login', 'copyright', 'copyright_text', 'en', '© Lättfaktura, CRO no. 638537, 2025. All rights reserved.', 1),

-- login - Swedish
('login', 'brand', 'brand_name', 'sv', '123 Fakturera', 1),
('login', 'links', 'nav_home', 'sv', 'Hem', 1),
('login', 'links', 'nav_order', 'sv', 'Beställ', 2),
('login', 'links', 'nav_contact', 'sv', 'Kontakta oss', 3),
('login', 'copyright', 'copyright_text', 'sv', '© Lättfaktura, CRO no. 638537, 2025. All rights reserved.', 1)
ON CONFLICT (page_name, section, component_key, language) DO NOTHING;

INSERT INTO page_content (page_name, section, component_key, language, content, display_order)
VALUES
-- Register Page - English
('register', 'nav', 'nav_home', 'en', 'Home', 1),
('register', 'nav', 'nav_order', 'en', 'Order', 2),
('register', 'nav', 'nav_customers', 'en', 'Our Customers', 3),
('register', 'nav', 'nav_about', 'en', 'About us', 4),
('register', 'nav', 'nav_contact', 'en', 'Contact Us', 5),
('register', 'nav', 'nav_terms', 'en', 'Terms', 6),
('register', 'nav', 'nav_login', 'en', 'Login', 7),
('register', 'nav', 'lang_switcher', 'en', 'English', 8),
('register', 'header', 'title', 'en', 'Register', 1),
('register', 'form', 'name_label', 'en', 'Enter your full name', 1),
('register', 'form', 'name_placeholder', 'en', 'Full Name', 2),
('register', 'form', 'email_label', 'en', 'Enter your email address', 3),
('register', 'form', 'email_placeholder', 'en', 'Email address', 4),
('register', 'form', 'password_label', 'en', 'Enter your password', 5),
('register', 'form', 'password_placeholder', 'en', 'Password', 6),
('register', 'form', 'button_submit', 'en', 'Register', 7),
('register', 'actions', 'link_login', 'en', 'Already have an account? Log in', 1),
('register', 'nav', 'lang_switcher', 'en', 'English', 8),
('register', 'brand', 'brand_name', 'en', '123 Fakturera', 1),
('register', 'links', 'nav_home', 'en', 'Home', 1),
('register', 'links', 'nav_order', 'en', 'Order', 2),
('register', 'links', 'nav_contact', 'en', 'Contact us', 3),
('register', 'copyright', 'copyright_text', 'en', '© Lättfaktura, CRO no. 638537, 2025. All rights reserved.', 1),

-- Register Page - Swedish
('register', 'header', 'title', 'sv', 'Registrera dig', 1),
('register', 'form', 'name_label', 'sv', 'Ange ditt fullständiga namn', 1),
('register', 'form', 'name_placeholder', 'sv', 'Fullständigt namn', 2),
('register', 'form', 'email_label', 'sv', 'Skriv in din epost adress', 3),
('register', 'form', 'email_placeholder', 'sv', 'Epost adress', 4),
('register', 'form', 'password_label', 'sv', 'Skriv in ditt lösenord', 5),
('register', 'form', 'password_placeholder', 'sv', 'Lösenord', 6),
('register', 'form', 'button_submit', 'sv', 'Registrera dig', 7),
('register', 'actions', 'link_login', 'sv', 'Har du redan ett konto? Logga in', 1),
('register', 'brand', 'brand_name', 'sv', '123 Fakturera', 1),
('register', 'links', 'nav_home', 'sv', 'Hem', 1),
('register', 'links', 'nav_order', 'sv', 'Beställ', 2),
('register', 'links', 'nav_contact', 'sv', 'Kontakta oss', 3),
('register', 'copyright', 'copyright_text', 'sv', '© Lättfaktura, CRO no. 638537, 2025. All rights reserved.', 1),
('register', 'nav', 'nav_home', 'sv', 'Hem', 1),
('register', 'nav', 'nav_order', 'sv', 'Beställ', 2),
('register', 'nav', 'nav_customers', 'sv', 'Våra Kunder', 3),
('register', 'nav', 'nav_about', 'sv', 'Om oss', 4),
('register', 'nav', 'nav_contact', 'sv', 'Kontakta oss', 5),
('register', 'nav', 'nav_terms', 'sv', 'Villkor', 6),
('register', 'nav', 'nav_login', 'sv', 'Logga in', 7),
('register', 'nav', 'lang_switcher', 'sv', 'Svenska', 8)
ON CONFLICT (page_name, section, component_key, language) DO NOTHING;


INSERT INTO page_content (page_name, section, component_key, language, content, display_order)
VALUES
-- Dashboard Navigation Sidebar (Full Menu)
('dashboard', 'nav', 'nav_invoices', 'en', 'Invoices', 1),
('dashboard', 'nav', 'nav_customers', 'en', 'Customers', 2),
('dashboard', 'nav', 'nav_my_business', 'en', 'My Business', 3),
('dashboard', 'nav', 'nav_invoice_journal', 'en', 'Invoice Journal', 4),
('dashboard', 'nav', 'nav_price_list', 'en', 'Price List', 5),
('dashboard', 'nav', 'nav_multiple_invoicing', 'en', 'Multiple Invoicing', 6),
('dashboard', 'nav', 'nav_unpaid_invoices', 'en', 'Unpaid Invoices', 7),
('dashboard', 'nav', 'nav_offer', 'en', 'Offer', 8),
('dashboard', 'nav', 'nav_inventory_control', 'en', 'Inventory Control', 9),
('dashboard', 'nav', 'nav_member_invoicing', 'en', 'Member Invoicing', 10),
('dashboard', 'nav', 'nav_import_export', 'en', 'Import/Export', 11),
('dashboard', 'nav', 'nav_logout', 'en', 'Log out', 12),

-- Dashboard Navigation Sidebar (Full Menu - Swedish)
('dashboard', 'nav', 'nav_invoices', 'sv', 'Fakturor', 1),
('dashboard', 'nav', 'nav_customers', 'sv', 'Kunder', 2),
('dashboard', 'nav', 'nav_my_business', 'sv', 'Min Verksamhet', 3),
('dashboard', 'nav', 'nav_invoice_journal', 'sv', 'Fakturajournal', 4),
('dashboard', 'nav', 'nav_price_list', 'sv', 'Prislista', 5),
('dashboard', 'nav', 'nav_multiple_invoicing', 'sv', 'Flerfakturering', 6),
('dashboard', 'nav', 'nav_unpaid_invoices', 'sv', 'Obetalda Fakturor', 7),
('dashboard', 'nav', 'nav_offer', 'sv', 'Offert', 8),
('dashboard', 'nav', 'nav_inventory_control', 'sv', 'Lagerstyrning', 9),
('dashboard', 'nav', 'nav_member_invoicing', 'sv', 'Medlemsfakturering', 10),
('dashboard', 'nav', 'nav_import_export', 'sv', 'Import/Export', 11),
('dashboard', 'nav', 'nav_logout', 'sv', 'Logga ut', 12),

-- Dashboard Main Content (Price List View) - English
('dashboard', 'content', 'page_title', 'en', 'Price List', 1),
('dashboard', 'content', 'search_placeholder', 'en', 'Search products...', 2),

-- Dashboard Action Buttons - English
('dashboard', 'actions', 'button_new_product', 'en', 'New Product', 1),
('dashboard', 'actions', 'button_print_list', 'en', 'Print List', 2),

-- Dashboard Table Headers - English
('dashboard', 'table', 'col_article_no', 'en', 'Article No.', 1),
('dashboard', 'table', 'col_product_service', 'en', 'Product/Service', 2),
('dashboard', 'table', 'col_in_price', 'en', 'In Price', 3),
('dashboard', 'table', 'col_out_price', 'en', 'Out Price', 4),
('dashboard', 'table', 'col_unit', 'en', 'Unit', 5),
('dashboard', 'table', 'col_in_stock', 'en', 'In Stock', 6),

-- Dashboard Main Content (Price List View) - Swedish
('dashboard', 'content', 'page_title', 'sv', 'Prislista', 1),
('dashboard', 'content', 'search_placeholder', 'sv', 'Sök produkter...', 2),

-- Dashboard Action Buttons - Swedish
('dashboard', 'actions', 'button_new_product', 'sv', 'Ny produkt', 1),
('dashboard', 'actions', 'button_print_list', 'sv', 'Skriv ut lista', 2),

-- Dashboard Table Headers - Swedish
('dashboard', 'table', 'col_article_no', 'sv', 'Artikelnummer', 1),
('dashboard', 'table', 'col_product_service', 'sv', 'Produkt/Tjänst', 2),
('dashboard', 'table', 'col_in_price', 'sv', 'Inköpspris', 3),
('dashboard', 'table', 'col_out_price', 'sv', 'Försäljningspris', 4),
('dashboard', 'table', 'col_unit', 'sv', 'Enhet', 5),
('dashboard', 'table', 'col_in_stock', 'sv', 'I lager', 6)
ON CONFLICT (page_name, section, component_key, language) DO NOTHING;

-- ✅ Confirmation
DO $$
BEGIN
  RAISE NOTICE '🌱 Seed data inserted successfully (if not already present)';
END$$;