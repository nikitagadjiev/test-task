-- public.cars definition

-- Drop table

-- DROP TABLE public.cars;

CREATE TABLE public.cars (
	id serial NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	brand varchar(200) NULL,
	"number" varchar(200) NULL,
	model varchar(200) NULL,
	vin varchar(17) NULL,
	is_rented bool NULL DEFAULT false,
	last_rent_date timestamp NULL,
	CONSTRAINT cars_pkey PRIMARY KEY (id)
);


-- public.discounts definition

-- Drop table

-- DROP TABLE public.discounts;

CREATE TABLE public.discounts (
	id serial NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	min_days int4 NULL,
	max_days int4 NULL,
	value int4 NULL,
	CONSTRAINT discounts_pkey PRIMARY KEY (id)
);


-- public.tariffs definition

-- Drop table

-- DROP TABLE public.tariffs;

CREATE TABLE public.tariffs (
	id serial NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	price int4 NULL,
	distance_limit int4 NULL,
	"name" varchar(200) NULL,
	CONSTRAINT tariffs_pkey PRIMARY KEY (id)
);


-- public.rent_sessions definition

-- Drop table

-- DROP TABLE public.rent_sessions;

CREATE TABLE public.rent_sessions (
	id serial NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	car_id serial NOT NULL,
	tariff_id serial NOT NULL,
	discount_id serial NOT NULL,
	from_date timestamp NULL,
	to_date timestamp NULL,
	CONSTRAINT rent_sessions_pkey PRIMARY KEY (id),
	CONSTRAINT rent_sessions_car_id_fkey FOREIGN KEY (car_id) REFERENCES public.cars(id) ON DELETE CASCADE,
	CONSTRAINT rent_sessions_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discounts(id) ON DELETE CASCADE,
	CONSTRAINT rent_sessions_tariff_id_fkey FOREIGN KEY (tariff_id) REFERENCES public.tariffs(id) ON DELETE CASCADE
);