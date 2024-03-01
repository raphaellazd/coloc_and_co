INSERT INTO public."colocation"(
    group_name, address, code_coloc, population)
    VALUES
    ('La coloc des rêves','453 Avenue Oberkampf 1 étage','44565', 4),
    ('Les marchands de sable', '56 Allée d''Orsel Apt. 500','83929', 4);


INSERT INTO public."user"
     ( firstname,lastname,birthdate, phone_number,email,
     password, emergency_name, emergency_link, emergency_number,
     profession, avatar_file, available, colocation_id)
     VALUES 
    ('Ludolphe', 'Carpentier', '1960-05-27T23:00:00.000Z'::date, '0643464636','Basile.Carpentier@gmail.com','C7WIPriu4l3pgla',  'Tonnin', 'Frère', '0763024138', 'Executif de paradigme humain','https://avatars.githubusercontent.com/u/55112524', 'true', 1),
    ('Azalée','Guyot','1983-09-08T22:00:00.000Z'::date,'0643677193', 'Leopold.Brunet@yahoo.fr', 'dibE_D7OAYWFyiD', 'Isabelle', 'Amie', '0425687222','Developpeur de recherche humain','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/201.jpg', 'true', 1),
    ('Angilberte', 'Roussel', '2003-09-18T22:00:00.000Z'::date, '+33 701509202', 'Cesaire44@gmail.com','QP7cknR83Wwy6B2', 'Honorine', 'Mère', '+33 575445248', 'Administrateur de marque national', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1157.jpg', 'false', 2),
    ('Aldric','Simon', '1991-01-17T23:00:00.000Z'::date, '+33 686306831', 'Regis_Colin@yahoo.fr', 'QrbYaM0W1k_51V6',  'Pauline', 'Soeur', '0436782582', 'Stagiaire de la tactique régional','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/887.jpg', 'true', 2),
    ('Arcadie','Renaud','1975-07-26T23:00:00.000Z'::date,'0583466393', 'Martial29@hotmail.fr','SA88tsansKqlkYP', 'Betty', 'Ami','+33 431257014','Consultant de la création mondial','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/311.jpg', 'false', 1),
    ('Loup', 'Lambert','1988-10-06T23:00:00.000Z'::date, '+33 100515421', 'Leon19@hotmail.fr','jgOED83efhzJbK7',   'Nathanaël', 'Père', '0612735711','Stagiaire du marketing client', 'https://avatars.githubusercontent.com/u/78388890','false', 1),
    ('Émérencie','Lucas','1985-10-24T23:00:00.000Z'::date, '0677137027', 'Melisande26@hotmail.fr', 'c2AZHyE8YURXDMs',  'Béranger', 'Cousin', '+33 512598788', 'Agent de marque futur','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/279.jpg', 'true', 2),
    ('Sylvie','Schmitt','2003-10-19T22:00:00.000Z'::date,'0146157243', 'Carpentier@gmail.com', 'C7WIPriu4l3', 'Eubert', 'Oncle', '0604308274','Designer des métriques direct','https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg', 'true', 2);


INSERT INTO public."calendar_event"(
    label, date, tag, user_id, colocation_id)
    VALUES
    ('Soirée Raclette', '2024-02-28'::date, 'Festif', 2, 2),
    ('Réunion Sylvie','2024-02-15'::date,'Rendez-vous',5, 2),
    ('Nettoyage d''été','2024-02-05'::date,'Rangement',6, 1),
    ('Mariage de Arcadie', '2024-05-14'::date,'Festif',3, 1);


INSERT INTO public."household_task"(
    description, --date-- ,
     done, user_id, colocation_id)
VALUES
    ('Passer l''aspirateur', --'2024-02-12' + interval '1 day', 
    'false', NULL, 1),
    ('Passer la serpillère', --'2024-02-13' + interval '1 day',
    'true', 1, 1),
    ('Faire les vitres', --'2024-02-14' + interval '1 day',
    'false', NULL, 2),
    ('Faire la poussière', --'2024-05-15' + interval '1 day',
    'false', NULL, 2);

INSERT INTO public."reward"(label, picture)
    VALUES
    ('Le maitre du nettoyage', 'https://blabla.bla'),
    ('Le roi des démocrates', 'https://blabla.bla');

INSERT INTO public."poll"(question, date, colocation_id)
    VALUES
    ('Une soirée raclette ce week-end ? ', '2024-02-15'::date, 2),
    ('Vous êtes chauds pour nettoyer la jardin et tondre la pelouse dans une semaine ?', '2024-02-11'::date, 1);

INSERT INTO public."response"(response, user_id, poll_id)
    VALUES
    ('true', 5, 1),
    ('true', 6, 1),
    ('false', 7, 2),
    ('true', 8, 2);

INSERT INTO public."tag_color"(label)
    VALUES
    ('#808000'),
    ('#0000FF'),
    ('#800080'),
    ('#C0C0C0'),
    ('#FF5733'),
    ('#008000'),
    ('#DAF7A6'),
    ('#FFA07A'),
    ('#A5FF33'),
    ('#33A5FF'),
    ('#FF33F9'),
    ('#C70039');

INSERT INTO public."allergy"(label, tag_color_id)
    VALUES
    ('Arachide', 1),
    ('Crustacés', 2),
    ('Gluten', 3),
    ('Lactose', 4),
    ('Pollen', 5),
    ('Poils d''animaux', 6),
    ('Fruits secs / à coques', 7);


INSERT INTO public."house_rule"(content, date, colocation_id)
    VALUES
    ('Article 1:
Objet Le présent règlement intérieur a pour objet de définir les règles de vie commune au sein de la colocation située à [adresse complète]. 
Article 2:
Respect Mutuel Chaque colocataire s’engage à respecter les autres membres de la colocation. Le respect mutuel est essentiel pour maintenir un environnement harmonieux.
Article 3:
Utilisation des Espaces Communs Les espaces communs tels que la cuisine, le salon, et les salles de bains doivent être maintenus propres et rangés après utilisation. Chaque colocataire est responsable du nettoyage de ses propres espaces.
Article 4:
Partage des Charges Les charges liées au logement, telles que l’électricité, l’eau, le chauffage, et l’accès à Internet, seront réparties équitablement entre tous les colocataires. Un système équitable de contribution doit être mis en place.
Article 5:
Respect des Heures de Repos Chaque colocataire s’engage à respecter les heures de repos des autres membres de la colocation. Les bruits excessifs, les fêtes tardives, ou toute autre activité perturbatrice sont interdits pendant les heures de repos.
Article 6:
Invités Les invités sont les bienvenus, mais chaque colocataire doit informer les autres membres de la colocation de la présence d’invités à l’avance. Les invités ne sont pas autorisés à rester pendant une période prolongée sans le consentement unanime des colocataires.
Article 7:
Interdiction de Fumer Il est strictement interdit de fumer à l’intérieur de la colocation. Des zones désignées à l’extérieur peuvent être utilisées pour fumer, en veillant à maintenir la propreté de ces zones.
Article 8:
Gestion des Courses La gestion des courses communes, telle que l’achat de produits ménagers ou d’épicerie partagée, doit être discutée et organisée de manière à garantir une répartition équitable des responsabilités et des coûts.
Article 9:
Maintenance et Réparations Tout problème de maintenance ou de réparation doit être signalé immédiatement au propriétaire ou au gestionnaire du logement. Les frais de réparation nécessaires en raison d’une négligence ou d’une utilisation inappropriée seront partagés entre les colocataires responsables.
Article 10:
Résolution des Conflits En cas de conflit, les colocataires s’engagent à résoudre la situation de manière constructive. La communication ouverte et le respect des opinions de chacun sont encouragés. En cas de désaccord persistant, une médiation peut être envisagée.
Article 11:
Modification du Règlement Toute modification du présent règlement intérieur doit être discutée et acceptée à l’unanimité par tous les membres de la colocation. En signant ce règlement intérieur, chaque colocataire reconnaît avoir pris connaissance des règles énoncées et s’engage à les respecter.', now(), 1),
    ('Article 1:
Objet Le présent règlement intérieur a pour objet de définir les règles de vie commune au sein de la colocation située à [adresse complète]. 
Article 2:
Respect Mutuel Chaque colocataire s’engage à respecter les autres membres de la colocation. Le respect mutuel est essentiel pour maintenir un environnement harmonieux.
Article 3:
Utilisation des Espaces Communs Les espaces communs tels que la cuisine, le salon, et les salles de bains doivent être maintenus propres et rangés après utilisation. Chaque colocataire est responsable du nettoyage de ses propres espaces.
Article 4:
Partage des Charges Les charges liées au logement, telles que l’électricité, l’eau, le chauffage, et l’accès à Internet, seront réparties équitablement entre tous les colocataires. Un système équitable de contribution doit être mis en place.
Article 5:
Respect des Heures de Repos Chaque colocataire s’engage à respecter les heures de repos des autres membres de la colocation. Les bruits excessifs, les fêtes tardives, ou toute autre activité perturbatrice sont interdits pendant les heures de repos.
Article 6:
Invités Les invités sont les bienvenus, mais chaque colocataire doit informer les autres membres de la colocation de la présence d’invités à l’avance. Les invités ne sont pas autorisés à rester pendant une période prolongée sans le consentement unanime des colocataires.
Article 7:
Interdiction de Fumer Il est strictement interdit de fumer à l’intérieur de la colocation. Des zones désignées à l’extérieur peuvent être utilisées pour fumer, en veillant à maintenir la propreté de ces zones.
Article 8:
Gestion des Courses La gestion des courses communes, telle que l’achat de produits ménagers ou d’épicerie partagée, doit être discutée et organisée de manière à garantir une répartition équitable des responsabilités et des coûts.
Article 9:
Maintenance et Réparations Tout problème de maintenance ou de réparation doit être signalé immédiatement au propriétaire ou au gestionnaire du logement. Les frais de réparation nécessaires en raison d’une négligence ou d’une utilisation inappropriée seront partagés entre les colocataires responsables.
Article 10:
Résolution des Conflits En cas de conflit, les colocataires s’engagent à résoudre la situation de manière constructive. La communication ouverte et le respect des opinions de chacun sont encouragés. En cas de désaccord persistant, une médiation peut être envisagée.
Article 11:
Modification du Règlement Toute modification du présent règlement intérieur doit être discutée et acceptée à l’unanimité par tous les membres de la colocation. En signant ce règlement intérieur, chaque colocataire reconnaît avoir pris connaissance des règles énoncées et s’engage à les respecter.', now(), 2);


INSERT INTO public."expense"(label, sum, date, user_id, colocation_id)
    VALUES
    ('Courses', 270, '2024-02-15'::date, 1, 1),
    ('Loyer', 950, '2024-03-05'::date, 2, 1),
    ('Charges', 310, '2024-02-06'::date, 5, 1),
    ('Loyer', 1200, '2024-03-05'::date, 6, 1),
    ('Courses', 270, '2024-02-15'::date, 2, 1),
    ('Loyer', 950, '2024-03-05'::date, 2, 1),
    ('Charges', 310, '2024-02-06'::date, 1, 1),
    ('Loyer', 1200, '2024-03-05'::date, 6, 1),
    ('Courses', 270, '2024-02-15'::date, 6, 1),
    ('Loyer', 950, '2024-03-05'::date, 1, 1),
    ('Charges', 310, '2024-02-06'::date, 5, 1),
    ('Loyer', 1200, '2024-03-05'::date, 6, 1);
    
INSERT INTO public."article_shoplist"(name, buyed, colocation_id, expense_id)
    VALUES
    ('Serpilleres', 'false', 1, 1),
    ('Liquide vaiselle', 'false', 1, 2),
    ('eponges', 'false', 2, 3),
    ('manche a balai', 'false', 2, 4);

INSERT INTO public."message"(content, date, colocation_id, user_id)
    VALUES
    ('Salut comment ça va ?', now(), 1, 2),
    ('Où est passé l''aspirateur ?', now(), 1, 6),
    ('Comment marche le système de la machine à laver ?', now(), 2, 8),
    ('Qu''est ce que vous voulez manger ce soir ?', now(), 2, 4);

INSERT INTO public."user_has_reward"( user_id, reward_id)
    VALUES
    (6, 1),
    (7, 2);

INSERT INTO public."user_has_allergy"( user_id, allergy_id)
    VALUES
    (2, 1),
    (3, 1),
    (8, 2),
    (5, 1);

INSERT INTO public."colocation_has_house_rule"(colocation_id, house_rule_id)
    VALUES
    (1, 2),
    (2, 1);
