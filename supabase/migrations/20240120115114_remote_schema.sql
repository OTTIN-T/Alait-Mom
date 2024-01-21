create type "public"."gender" as enum ('O', 'M', 'F');

alter table "public"."breastfeeding" drop constraint "breastfeeding_id_key";

alter table "public"."breastfeeding" drop constraint "breastfeeding_profile_id_fkey";

alter table "public"."children" drop constraint "children_profile_id_fkey";

alter table "public"."profile" drop constraint "profile_id_fkey";

drop index if exists "public"."breastfeeding_id_key";

alter table "public"."breastfeeding" add column "children_id" bigint;

alter table "public"."breastfeeding" alter column "profile_id" set default auth.uid();

alter table "public"."children" add column "birthdate" date;

alter table "public"."children" add column "description" character varying;

alter table "public"."children" add column "gender" gender;

alter table "public"."children" add column "size" real;

alter table "public"."children" add column "weight" real;

alter table "public"."children" alter column "profile_id" set default auth.uid();

alter table "public"."breastfeeding" add constraint "breastfeeding_children_id_fkey" FOREIGN KEY (children_id) REFERENCES children(id) not valid;

alter table "public"."breastfeeding" validate constraint "breastfeeding_children_id_fkey";

alter table "public"."breastfeeding" add constraint "breastfeeding_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) not valid;

alter table "public"."breastfeeding" validate constraint "breastfeeding_profile_id_fkey";

alter table "public"."children" add constraint "children_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."children" validate constraint "children_profile_id_fkey";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

create policy "Enable CRUD for user based on profile_id"
on "public"."breastfeeding"
as permissive
for all
to authenticated
using ((auth.uid() = profile_id))
with check ((auth.uid() = profile_id));


create policy "Enable CRUD for user based on profile_id"
on "public"."children"
as permissive
for all
to authenticated
using ((auth.uid() = profile_id))
with check ((auth.uid() = profile_id));


create policy "Enable DELETE for user based on user_id"
on "public"."profile"
as permissive
for delete
to authenticated
using ((auth.uid() = id));


create policy "Enable INSERT for user based on user_id"
on "public"."profile"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "Enable SELECT for user based on user_id"
on "public"."profile"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Enable UPDATE for user based on user_id"
on "public"."profile"
as permissive
for update
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));



