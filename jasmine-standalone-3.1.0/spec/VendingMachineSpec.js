describe("A vegan vending machine", function() {
  describe("When a coin is deposited", function() {
    it("Should accept a valid currency", function() {
      expect(validCoin("10c")).toBe(true);
      expect(validCoin("20c")).toBe(true);
      expect(validCoin("50c")).toBe(true);
      expect(validCoin("$1")).toBe(true);
      expect(validCoin("$2")).toBe(true);
    });
    it("Should not allow invalid currency", function() {
      expect(function(){
        validCoin("5c")
      }).toThrowError("Invalid currency.");
    });
  });
  describe("When purchasing an item", function() {
      beforeEach(function(){
        addCoin("$2")
      })
      afterEach(function(){
        totalCredit = 0.00;
      })
    it("should prompt you when you have the correct amount", function() {
      expect(true).toBe(true);
      //HTML value to have "<div id="organicRaw">organic raw is available for purchase.</div>"
    });
    it("should let you pruchase with the correct amount", function() {
      expect(buyItem("organicRaw")).toBe(true);
    });
  });
  describe("When refunding deposited coins", function(){
    it("should throw an error if there are no coins deposited", function() {
      expect(function(){
        returnCoins()
      }).toThrowError("No coins to return.")
    });
  });
});
