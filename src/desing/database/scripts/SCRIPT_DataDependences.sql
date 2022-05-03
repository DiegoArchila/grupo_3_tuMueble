/*
name: createSchemaTumueble.sql
description: create the schema tumueble with tables and relations
autors: Diego Alonso Archila, Colombia (Rionegro - Antioquia), Ricardo Mantilla
*/

-- POBLATE TABLES WITH INFORMATION

-- TABLE: usersGender
INSERT INTO 
	tumueble.usersGender(
        gender, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Hombre', 
        'Genero Hombre, Masculino.', 
        NOW(), 
        NOW()
    ),(
        'Mujer', 
        'Genero Mujer, Femenina', 
        NOW(), 
        NOW()
    ),(
        'No Definido', 
        'Genero No definido',
        NOW(),
        NOW()
    );

-- TABLE: emailsCategory
INSERT INTO 
	tumueble.emailsCategory(
        category, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Personal', 
        'Categoria para los mails personales de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Laboral', 
        'Categoria para los mails de caracter laboral de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Compartido', 
        'Categoria para los mails hibridos compartidos',
        NOW(),
        NOW()
    );

-- TABLE: phonesCategory
INSERT INTO 
	tumueble.phonesCategory(
        category, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Personal', 
        'Categoria para los numeros de teléfonos personales de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Laboral', 
        'Categoria para los numeros de teléfonos de caracter laboral de los usuarios', 
        NOW(), 
        NOW()
    ),(
        'Compartido', 
        'Categoria para los numeros de teléfonos hibridos compartidos',
        NOW(),
        NOW()
    );

-- TABLE: productsCategory 
INSERT INTO 
	tumueble.productsCategory(
        category, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Sofas', 
        'Categoria para los productos tipo Sofas', 
        NOW(), 
        NOW()
    ),(
        'Camas', 
        'Categoria para los productos tipo Camas', 
        NOW(), 
        NOW()
    ),(
        'Comedor', 
        'Categoria para los productos tipo Comedores',
        NOW(),
        NOW()
    ),(
        'Salas', 
        'Categoria para los productos tipo Salas',
        NOW(),
        NOW()
    ),(
        'Peinadores', 
        'Categoria para los productos tipo Peinadores',
        NOW(),
        NOW()
    ),(
        'Organizadores', 
        'Categoria para los productos tipo Organizadores, Chifonier',
        NOW(),
        NOW()
    );

-- TABLE: taxes
INSERT INTO 
	tumueble.taxes(
        taxeName, 
        taxeDescription,
        taxeValue,
        isActive,
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'IVA 19%', 
        'Iva del 19%',
        19.00,
        1,
        'Agrega notas referente al iva 19%',
        NOW(), 
        NOW()
    ),(
        'IVA 8%', 
        'Iva del 8%',
        8.00,
        1,
        'Agrega notas referente al iva 8%',
        NOW(), 
        NOW()
    ),(
        'IVA 16%', 
        'Iva del 16%',
        16.00,
        1,
        'Agrega notas referente al iva 16%',
        NOW(), 
        NOW()
);

-- TABLE: cartState 
INSERT INTO 
	tumueble.cartState(
        stateName,
        stateValue, 
        notes, 
        created_at, 
        updated_at
        )
VALUES(
        'Activo', 
        1,
        'Indica que el carrito esta activo', 
        NOW(), 
        NOW()
),(
        'Comprado', 
        2,
        'Indica que el carrito esta comprado', 
        NOW(), 
        NOW()
);

-- TABLE: users 
INSERT INTO 
	tumueble.users(
        firstName,
        lastName,
        DateBorn,
        genderId,
        imagen,
        pwd,
        isAdmin,
        created_at, 
        updated_at
        )
VALUES(
        -- LLenar datos referentes a tumueble.users
        'Super',
        'Admin :V',
        CURDATE(),
        1,
        '/img/avatar.jpg',
        '$2a$12$AJrgBEvyKCngvCAHDZiAseM0UBdTwSHPCe9qduCKTq5CZ8giUweVu', -- 12345, SALT 12
        1,
        NOW(), 
        NOW()
);