CREATE PROCEDURE insertProducts(@id VARCHAR(100) , @product VARCHAR(200) , @description VARCHAR(200))
AS
BEGIN
INSERT INTO Products(id,product,description) VALUES (@id,@product,@description)

END

-- CREATE PROCEDURE getProducts
-- AS
-- BEGIN
-- SELECT * FROM Products
-- END

-- CREATE PROCEDURE getProduct(@id VARCHAR(100))
-- AS
-- BEGIN
-- SELECT * FROM Products WHERE id =@id
-- END
-- CREATE PROCEDURE deleteProduct(@id VARCHAR(100))
-- AS
-- BEGIN
-- DELETE FROM Products WHERE id =@id
-- END



-- CREATE PROCEDURE updateProduct(@id VARCHAR(100) , @product VARCHAR(200) , @description VARCHAR(200))
-- AS
-- BEGIN 
-- UPDATE Products SET id=@id , product=@product , description=@description WHERE id =@id

-- END
