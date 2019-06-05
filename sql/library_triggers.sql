delimiter //
create trigger CopyNrAI before insert on copies
for each row
begin
	if exists (select distinct isbn 
			   from copies 
               where copies.isbn = new.isbn
               ) 
		then
			set NEW.copyNr = (select max(copyNr) 
							  from copies
                              where copies.isbn = new.isbn) 
                              + 1;
	end if;
end; //

delimiter //
create trigger MemberDeletionCheck before delete on members
for each row
begin
	if exists (select borrows.memberID
			   from borrows
               where date_of_return is null and old.memberID = borrows.memberID
               )
		then
			set @ID = convert(old.memberID, char);
			set @message = concat('Member: ', @ID, ', cannot be deleted as he has not returned a borrowed book');
            signal SQLstate '45000' set message_text = @message;
	end if;
end; //