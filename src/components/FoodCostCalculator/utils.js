import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

export const showSuccessMessage = (message, duration = 3000) => {
  const successMessage = document.createElement('div');
  successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  successMessage.textContent = message;
  document.body.appendChild(successMessage);
  
  setTimeout(() => {
    if (document.body.contains(successMessage)) {
      document.body.removeChild(successMessage);
    }
  }, duration);
};

export const showCopyMessage = (message, duration = 2000) => {
  const copyMessage = document.createElement('div');
  copyMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
  copyMessage.textContent = message;
  document.body.appendChild(copyMessage);
  
  setTimeout(() => {
    if (document.body.contains(copyMessage)) {
      document.body.removeChild(copyMessage);
    }
  }, duration);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showCopyMessage('Skopiowano do schowka!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// Local Storage Functions
export const saveToLocalStorage = (key, data) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
    return defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const clearLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export const generatePDF = async (meals, calculationHistory) => {
  try {
    const children = [];
    
    // Title
    children.push(
      new Paragraph({
        text: 'Kalkulator kosztów potraw',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    );
    
    // Generate content for each meal
    meals.forEach((meal, mealIndex) => {
      // Meal header
      children.push(
        new Paragraph({
          text: `Potrawa ${mealIndex + 1}: ${meal.dishName}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
        })
      );
      
      // Meal details
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Liczba porcji: ${meal.servings}`, break: 1 }),
            new TextRun({ text: `Docelowa marża: ${meal.targetMargin}%`, break: 1 })
          ],
          spacing: { after: 200 }
        })
      );
      
      // Ingredients table header
      children.push(
        new Paragraph({
          text: 'Składniki:',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 200 }
        })
      );
      
      // Ingredients table
      const tableRows = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: 'Lp.' })] }),
            new TableCell({ children: [new Paragraph({ text: 'Nazwa' })] }),
            new TableCell({ children: [new Paragraph({ text: 'Ilość' })] }),
            new TableCell({ children: [new Paragraph({ text: 'Cena/100g' })] }),
            new TableCell({ children: [new Paragraph({ text: 'Koszt' })] })
          ]
        })
      ];
      
      meal.ingredients.forEach((ingredient, index) => {
        const cost = (ingredient.quantity / 100) * ingredient.costPer100g;
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ text: `${index + 1}.` })] }),
              new TableCell({ children: [new Paragraph({ text: ingredient.name })] }),
              new TableCell({ children: [new Paragraph({ text: `${ingredient.quantity} ${ingredient.unit}` })] }),
              new TableCell({ children: [new Paragraph({ text: `${ingredient.costPer100g} zł/100g` })] }),
              new TableCell({ children: [new Paragraph({ text: `${cost.toFixed(2)} zł` })] })
            ]
          })
        );
      });
      
      children.push(
        new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
            insideVertical: { style: BorderStyle.SINGLE, size: 1 }
          },
          spacing: { after: 300 }
        })
      );
      
      // Meal results
      children.push(
        new Paragraph({
          text: 'Wyniki:',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 200 }
        })
      );
      
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Całkowity koszt składników: ${meal.totalCost.toFixed(2)} zł`, break: 1 }),
            new TextRun({ text: `Koszt na porcję: ${meal.costPerServing.toFixed(2)} zł`, break: 1 }),
            new TextRun({ text: `Sugerowana cena sprzedaży: ${meal.suggestedPrice.toFixed(2)} zł`, break: 1 })
          ],
          spacing: { after: 400 }
        })
      );
    });
    
    // Summary if multiple meals
    if (meals.length > 1) {
      children.push(
        new Paragraph({
          text: 'Podsumowanie wszystkich potraw',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
        })
      );
      
      const totalCost = meals.reduce((sum, meal) => sum + meal.totalCost, 0);
      const totalSuggestedPrice = meals.reduce((sum, meal) => sum + meal.suggestedPrice, 0);
      
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Liczba potraw: ${meals.length}`, break: 1 }),
            new TextRun({ text: `Całkowity koszt wszystkich składników: ${totalCost.toFixed(2)} zł`, break: 1 }),
            new TextRun({ text: `Całkowita sugerowana cena sprzedaży: ${totalSuggestedPrice.toFixed(2)} zł`, break: 1 })
          ],
          spacing: { after: 300 }
        })
      );
    }
    
    // Create document
    const doc = new Document({
      sections: [{
        properties: {},
        children: children
      }]
    });
    
    // Generate and download file
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fileName = meals.length > 1 
      ? `kalkulacja-${meals.length}-potraw.docx`
      : `kalkulacja-${meals[0].dishName.replace(/\s+/g, '-')}.docx`;
    
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showSuccessMessage('Dokument Word został wygenerowany i pobrany!');
  } catch (error) {
    console.error('Error generating document:', error);
    showSuccessMessage('Błąd podczas generowania dokumentu');
  }
};