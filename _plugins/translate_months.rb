module Jekyll
    module TranslateMonthFilter
      MONTH_TRANSLATIONS = {
        "January" => "Enero",
        "February" => "Febrero",
        "March" => "Marzo",
        "April" => "Abril",
        "May" => "Mayo",
        "June" => "Junio",
        "July" => "Julio",
        "August" => "Agosto",
        "September" => "Septiembre",
        "October" => "Octubre",
        "November" => "Noviembre",
        "December" => "Diciembre"
      }
  
      def translate_month(input)
        MONTH_TRANSLATIONS[input] || input
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::TranslateMonthFilter)